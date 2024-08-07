import { NextResponse, NextRequest } from 'next/server';

import { UserType } from './types/enums';
import { getIsLoggedIn, getRefreshTokenPayload } from './utils/serverActions';

const LOGGED_IN_ONLY_ROUTES = ['/profile', '/dashboard'];
const LOGGED_OUT_ONLY_ROUTES = ['/auth/login', '/auth/signup'];
const CLIENT_ONLY_ROUTES = ['/projects/create'];
const DEVELOPER_ONLY_ROUTES: string[] = [];
const PM_ONLY_ROUTES: string[] = [];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isLoggedIn = await getIsLoggedIn();

  if (LOGGED_IN_ONLY_ROUTES.includes(pathname) && !isLoggedIn) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  if (LOGGED_OUT_ONLY_ROUTES.includes(pathname) && isLoggedIn) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (CLIENT_ONLY_ROUTES.includes(pathname)) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    const jwtPayload = await getRefreshTokenPayload();

    if (jwtPayload?.payload.userType !== UserType.CLIENT) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  if (DEVELOPER_ONLY_ROUTES.includes(pathname)) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    const jwtPayload = await getRefreshTokenPayload();

    if (jwtPayload?.payload.userType !== UserType.DEVELOPER) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  if (PM_ONLY_ROUTES.includes(pathname)) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    const jwtPayload = await getRefreshTokenPayload();

    if (jwtPayload?.payload.userType !== UserType.PM) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
