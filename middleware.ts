import { NextResponse, NextRequest } from 'next/server';

import { getIsLoggedIn } from './utils/serverActions';

const LOGGED_IN_ONLY_ROUTES = ['/profile'];
const LOGGED_OUT_ONLY_ROUTES = ['/auth/login', '/auth/signup'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isLoggedIn = await getIsLoggedIn();

  if (LOGGED_IN_ONLY_ROUTES.includes(pathname) && !isLoggedIn) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  if (LOGGED_OUT_ONLY_ROUTES.includes(pathname) && isLoggedIn) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
