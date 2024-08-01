import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { UserIdResponse } from '@/types';
import { axiosClient } from '@/utils/axiosClient';

export type LogoutResponse = {
  success: boolean;
  message: string;
};

export async function POST() {
  try {
    const token = cookies().get('access_token')?.value;

    if (!token) {
      return NextResponse.json<LogoutResponse>({ success: true, message: 'No token found' }, { status: 200 });
    }

    const response = await axiosClient.post<UserIdResponse>(
      '/auth/logout',
      {},
      { headers: { Authorization: `Bearer ${token}` } },
    );

    if (!response.data || !response.data.userId) {
      return NextResponse.json<LogoutResponse>({ success: false, message: 'An error occurred' }, { status: 500 });
    }

    cookies().delete('access_token');
    cookies().delete('refresh_token');

    return NextResponse.json<LogoutResponse>(
      {
        success: true,
        message: 'Successfully logged out',
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json<LogoutResponse>({ success: false, message: 'An error occurred' }, { status: 500 });
  }
}
