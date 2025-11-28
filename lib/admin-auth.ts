import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin';
const ADMIN_SESSION_KEY = 'admin_session';

export function verifyAdminPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

export async function checkAdminSession(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get(ADMIN_SESSION_KEY);
    return !!session;
  } catch {
    return false;
  }
}

export function checkAdminAuth(request: NextRequest): boolean {
  const session = request.cookies.get(ADMIN_SESSION_KEY);
  return !!session;
}

