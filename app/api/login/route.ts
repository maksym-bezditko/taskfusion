import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { LoginFormValues } from '@/components/schemas/loginSchema';
import { JwtTokensResponse } from '@/types';
import { axiosClient } from '@/utils/axiosClient';

type LoginRequest = LoginFormValues;

export type SignupResponse = {
  success: boolean;
  message: string;
};

const DEFAULT_AGE = 60 * 60 * 24 * 30;

export async function POST(req: Request) {
  try {
    const { email, password }: LoginRequest = await req.json();

    const response = await axiosClient.post<JwtTokensResponse>('/auth/login', {
      email,
      password,
    });

    if (!response.data || !response.data.accessToken || !response.data.refreshToken) {
      return NextResponse.json<SignupResponse>({ success: false, message: 'An error occurred' }, { status: 500 });
    }

    cookies().set('access_token', response.data.accessToken, { maxAge: DEFAULT_AGE, httpOnly: false, secure: true });
    cookies().set('refresh_token', response.data.refreshToken, { maxAge: DEFAULT_AGE, httpOnly: true, secure: true });

    return NextResponse.json<SignupResponse>(
      {
        success: true,
        message: 'Data processed successfully',
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json<SignupResponse>({ success: false, message: 'An error occurred' }, { status: 500 });
  }
}
