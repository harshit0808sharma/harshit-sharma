import { SignJWT, jwtVerify, JWTPayload } from 'jose';
import bcrypt from 'bcryptjs';

const JWT_SECRET_STRING =
  process.env.JWT_SECRET || 'super-secret-portfolio-jwt-key-change-in-env-9823471923';
const JWT_SECRET = new TextEncoder().encode(JWT_SECRET_STRING);

// Default token expiration: 24 hours
export const DEFAULT_JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';
export const AUTH_COOKIE_NAME = 'admin_token';

export interface AuthUserPayload extends JWTPayload {
  id: string;
  email: string;
  name?: string;
  role?: string;
}

/**
 * Hash a plain text password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

/**
 * Compare plain text password against bcrypt hash
 */
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Sign a new JWT with an expiration time (e.g. '24h', '7d', '1h')
 */
export async function signJwt(
  payload: { id: string; email: string; name?: string; role?: string },
  expiresIn: string = DEFAULT_JWT_EXPIRES_IN
): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(JWT_SECRET);
}

/**
 * Verify a JWT and handle expiration
 */
export async function verifyJwt(token: string): Promise<{
  valid: boolean;
  payload?: AuthUserPayload;
  expired?: boolean;
  error?: string;
}> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return {
      valid: true,
      payload: payload as AuthUserPayload,
      expired: false,
    };
  } catch (error: any) {
    const isExpired = error?.code === 'ERR_JWT_EXPIRED';
    return {
      valid: false,
      expired: isExpired,
      error: isExpired ? 'Token has expired' : (error?.message || 'Invalid token'),
    };
  }
}

/**
 * Extract auth token from Request headers or cookies
 */
export function extractTokenFromRequest(req: Request): string | null {
  // 1. Authorization: Bearer <token>
  const authHeader = req.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7).trim();
  }

  // 2. Cookie header: admin_token=<token>
  const cookieHeader = req.headers.get('cookie');
  if (cookieHeader) {
    const cookies = cookieHeader.split(';').map((c) => c.trim());
    for (const cookie of cookies) {
      if (cookie.startsWith(`${AUTH_COOKIE_NAME}=`)) {
        return decodeURIComponent(cookie.substring(AUTH_COOKIE_NAME.length + 1));
      }
    }
  }

  return null;
}

/**
 * Authenticate incoming request, returns decoded payload or null
 */
export async function authenticateRequest(req: Request): Promise<AuthUserPayload | null> {
  const token = extractTokenFromRequest(req);
  if (!token) return null;

  const result = await verifyJwt(token);
  if (!result.valid || !result.payload) return null;

  return result.payload;
}
