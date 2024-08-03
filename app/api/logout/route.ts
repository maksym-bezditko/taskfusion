import { NextResponse } from 'next/server';

import { api } from '@/utils/api';
import { getCookies, removeTokens } from '@/utils/serverActions';

export type LogoutResponse = {
  success: boolean;
  message: string;
};

export async function POST() {
  try {
    const token = await getCookies('access_token');

    if (!token) {
      return NextResponse.json<LogoutResponse>({ success: true, message: 'No token found' }, { status: 200 });
    }

    await api.removeRefreshToken(token);

    await removeTokens();

    return NextResponse.json<LogoutResponse>(
      {
        success: true,
        message: 'Successfully logged out',
      },
      { status: 200 },
    );
  } catch (error) {
    await removeTokens();

    return NextResponse.json<LogoutResponse>(
      {
        success: true,
        message: "Couldn't remove the refresh token from the database",
      },
      { status: 200 },
    );
  }
}
