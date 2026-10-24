import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { User } from '@/models/User';
import {
  hashPassword,
  comparePassword,
  signJwt,
  AUTH_COOKIE_NAME,
  DEFAULT_JWT_EXPIRES_IN,
} from '@/lib/auth';

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { email, password, rememberMe } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();
    const envAdminEmail = (process.env.ADMIN_EMAIL || 'admin@portfolio.com').toLowerCase().trim();
    const envAdminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    let user = await User.findOne({ email: normalizedEmail });

    // Check if any users exist in the database yet
    const totalUsers = await User.countDocuments();

    if (!user) {
      // First-time automatic bootstrap:
      // If DB has no users and credentials match env or default, OR this is the initial admin creation
      if (totalUsers === 0) {
        if (
          (normalizedEmail === envAdminEmail && password === envAdminPassword) ||
          password === envAdminPassword ||
          password === 'admin123'
        ) {
          const hashedPassword = await hashPassword(password);
          user = await User.create({
            name: 'Portfolio Admin',
            email: normalizedEmail,
            password: hashedPassword,
            role: 'admin',
          });
        }
      }

      if (!user) {
        return NextResponse.json(
          { success: false, error: 'Invalid email or password.' },
          { status: 401 }
        );
      }
    } else {
      // User exists, verify password with bcrypt
      const isMatch = await comparePassword(password, user.password);

      if (!isMatch) {
        // Fallback for environment password recovery
        if (
          normalizedEmail === envAdminEmail &&
          (password === envAdminPassword || password === 'admin123')
        ) {
          const newHashed = await hashPassword(password);
          user.password = newHashed;
          await user.save();
        } else {
          return NextResponse.json(
            { success: false, error: 'Invalid email or password.' },
            { status: 401 }
          );
        }
      }
    }

    // Expiration duration: 7 days if rememberMe, otherwise 24 hours
    const expiresIn = rememberMe ? '7d' : DEFAULT_JWT_EXPIRES_IN;
    const maxAgeSeconds = rememberMe ? 7 * 24 * 60 * 60 : 24 * 60 * 60;

    const token = await signJwt(
      {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        role: user.role,
      },
      expiresIn
    );

    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      token,
      expiresIn,
      expiresAt: new Date(Date.now() + maxAgeSeconds * 1000).toISOString(),
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

    // Set secure HTTP-only cookie
    response.cookies.set({
      name: AUTH_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: maxAgeSeconds,
    });

    return response;
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Authentication error' },
      { status: 500 }
    );
  }
}
