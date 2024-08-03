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

    const accessTokenCookie = `access_token=${accessToken}; Path=/; Max-Age=${DEFAULT_AGE}; HttpOnly; Secure; SameSite=Strict`;
    const refreshTokenCookie = `refresh_token=${refreshToken}; Path=/; Max-Age=${DEFAULT_AGE}; HttpOnly; Secure; SameSite=Strict`;

    return new Response('Tokens set', {
      status: 200,
      headers: {
        'Set-Cookie': [accessTokenCookie, refreshTokenCookie].join(', '),
      },
    });
  } catch (error) {
    return NextResponse.json<Response>({ success: false, message: 'An error occurred' }, { status: 500 });
  }
}
