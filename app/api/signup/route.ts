import { NextResponse } from 'next/server';

import { SignupFormValues } from '@/components/schemas/signupSchema';
import { api } from '@/utils/api';
import { setTokens } from '@/utils/serverActions';

export type SignupRequest = SignupFormValues;

export type SignupResponse = {
  success: boolean;
  message: string;
  error?: unknown;
};

export async function POST(req: Request) {
  try {
    const requestData: SignupRequest = await req.json();

    const response = await api.createUser(requestData);

    if (!response.data || !response.data.accessToken || !response.data.refreshToken) {
      return NextResponse.json<SignupResponse>({ success: false, message: 'An error occurred' }, { status: 500 });
    }

    await setTokens(response.data.accessToken, response.data.refreshToken);

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
