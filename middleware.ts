import { NextResponse, NextRequest } from 'next/server';

import { UserType } from './types/enums';
import { getIsLoggedIn, getRefreshTokenPayload } from './utils/serverActions';

const LOGGED_IN_ONLY_ROUTES = ['/profile/', '/dashboard'];
const LOGGED_OUT_ONLY_ROUTES = ['/auth/login', '/auth/signup'];
const CLIENT_ONLY_ROUTES = ['/projects/create', '/projects/'];
const DEVELOPER_ONLY_ROUTES: string[] = [];
const PM_ONLY_ROUTES: string[] = ['/pm/project-invitation/'];

const matchesRoute = (url: string, routes: string[]) => {
  return routes.some((route) => {
    const regex = new RegExp(`^${route}(\\d+)?$`);

    return regex.test(url);
  });
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isLoggedIn = await getIsLoggedIn();

  if (matchesRoute(pathname, LOGGED_IN_ONLY_ROUTES) && !isLoggedIn) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  if (matchesRoute(pathname, LOGGED_OUT_ONLY_ROUTES) && isLoggedIn) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (matchesRoute(pathname, CLIENT_ONLY_ROUTES)) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    const jwtPayload = await getRefreshTokenPayload();

    if (jwtPayload?.payload.userType !== UserType.CLIENT) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  if (matchesRoute(pathname, DEVELOPER_ONLY_ROUTES)) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    const jwtPayload = await getRefreshTokenPayload();

    if (jwtPayload?.payload.userType !== UserType.DEVELOPER) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  if (matchesRoute(pathname, PM_ONLY_ROUTES)) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    const jwtPayload = await getRefreshTokenPayload();

    if (jwtPayload?.payload.userType !== UserType.PM) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
