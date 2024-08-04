import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { DEFAULT_AGE } from '@/utils/constrants';

export type SetTokensRequest = {
  accessToken: string;
  refreshToken: string;
};

export type Response = {
  success: boolean;
  message: string;
};

export async function POST(req: Request) {
  try {
    const { accessToken, refreshToken }: SetTokensRequest = await req.json();

    cookies().set('access_token', accessToken, {
      maxAge: DEFAULT_AGE,
      httpOnly: true,
    });

    cookies().set('refresh_token', refreshToken, {
      maxAge: DEFAULT_AGE,
      httpOnly: true,
    });

    return NextResponse.json<Response>({ success: false, message: 'An error occurred' }, { status: 500 });
  } catch (error) {
    return NextResponse.json<Response>({ success: false, message: 'An error occurred' }, { status: 500 });
  }
}
