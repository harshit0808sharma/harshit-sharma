import { NextResponse } from 'next/server';
import { extractTokenFromRequest, verifyJwt } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    const token = extractTokenFromRequest(req);

    if (!token) {
      return NextResponse.json(
        { success: false, authenticated: false, error: 'No authentication token provided.' },
        { status: 401 }
      );
    }

    const verification = await verifyJwt(token);

    if (!verification.valid || !verification.payload) {
      return NextResponse.json(
        {
          success: false,
          authenticated: false,
          expired: verification.expired || false,
          error: verification.error || 'Invalid or expired token.',
        },
        { status: 401 }
      );
    }

    const payload = verification.payload;
    const exp = typeof payload.exp === 'number' ? payload.exp : undefined;
    const expiresAt = exp ? new Date(exp * 1000).toISOString() : null;

    return NextResponse.json({
      success: true,
      authenticated: true,
      user: {
        id: payload.id,
        email: payload.email,
        name: payload.name,
        role: payload.role,
      },
      exp,
      expiresAt,
    });
  } catch (error: any) {
    console.error('Session check error:', error);
    return NextResponse.json(
      { success: false, authenticated: false, error: 'Authentication verification failed' },
      { status: 500 }
    );
  }
}
