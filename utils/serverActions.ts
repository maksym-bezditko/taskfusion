'use server';

import * as jose from 'jose';
import { cookies } from 'next/headers';

import { JwtPayload } from '@/types';

import { DEFAULT_AGE } from './constrants';

const jwtConfig = {
  atSecret: new TextEncoder().encode(process.env.AT_SECRET),
  rtSecret: new TextEncoder().encode(process.env.RT_SECRET),
};

export const isAccessTokenValid = async (token: string) => {
  try {
    await jose.jwtVerify(token, jwtConfig.atSecret);

    return true;
  } catch (error) {
    return false;
  }
};

export const isRefreshTokenValid = async (token: string) => {
  try {
    await jose.jwtVerify(token, jwtConfig.rtSecret);

    return true;
  } catch (error) {
    return false;
  }
};

export const getRefreshTokenPayload = async () => {
  try {
    const refreshToken = await getCookies('refresh_token');

    if (!refreshToken) {
      return null;
    }

    return jose.jwtVerify<JwtPayload>(refreshToken, jwtConfig.rtSecret);
  } catch (error) {
    return null;
  }
};

export const setTokens = async (accessToken: string, refreshToken: string) => {
  const cookieStorage = cookies();

  cookieStorage.set('access_token', accessToken, { maxAge: DEFAULT_AGE });
  cookieStorage.set('refresh_token', refreshToken, { maxAge: DEFAULT_AGE });
};

export const getCookies = async (name: string) => {
  return cookies().get(name)?.value;
};

export const removeTokens = async () => {
  cookies().delete('access_token');
  cookies().delete('refresh_token');
};

export const getIsLoggedIn = async () => {
  const refreshToken = await getCookies('refresh_token');

  if (!refreshToken) {
    return false;
  }

  const isTokenValid = await isRefreshTokenValid(refreshToken);

  return isTokenValid;
};
