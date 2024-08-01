import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { SignupFormValues } from '@/components/schemas/signupSchema';
import { JwtTokensResponse, UserType } from '@/types';
import { axiosClient } from '@/utils/axiosClient';

type SignupRequest = SignupFormValues;

export type SignupResponse = {
  success: boolean;
  message: string;
  error?: unknown;
};

const DEFAULT_AGE = 60 * 60 * 24 * 30;

export async function POST(req: Request) {
  try {
    const { email, name, password, description, position, telegramId }: SignupRequest = await req.json();

    const endpointUrl = (() => {
      if (position === UserType.CLIENT) {
        return '/auth/create-client';
      }

      if (position === UserType.DEVELOPER) {
        return '/auth/create-developer';
      }

      return '/auth/create-pm';
    })();

    const response = await axiosClient.post<JwtTokensResponse>(endpointUrl, {
      email,
      name,
      password,
      description,
      position,
      telegramId: telegramId || null,
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
    return NextResponse.json<SignupResponse>({ success: false, message: 'An error occurred', error }, { status: 500 });
  }
}
