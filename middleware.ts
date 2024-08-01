import { NextResponse, NextRequest } from 'next/server';

import { isJwtValid } from './utils/serverActions';

const PROTECTED_ROUTES = ['/profile'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PROTECTED_ROUTES.includes(pathname)) {
    const token = request.cookies.get('access_token');

    if (!token?.value) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    const isTokenValid = await isJwtValid(token.value);

    if (!isTokenValid) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
