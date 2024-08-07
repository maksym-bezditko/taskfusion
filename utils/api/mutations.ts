import axios from 'axios';

import { LoginRequest } from '@/app/api/login/route';
import { SignupRequest } from '@/app/api/signup/route';
import { JwtTokensResponse, UserIdResponse } from '@/types';
import { UserType } from '@/types/enums';
import { CreateProjectFormValues } from '@/utils/schemas/createProjectSchema';

import { externalApiClient } from '../externalApiClient';

export const createUser = async (data: SignupRequest) => {
  const { email, name, password, description, position, telegramId } = data;

  const endpointUrl = (() => {
    if (position === UserType.CLIENT) {
      return '/auth/create-client';
    }

    if (position === UserType.DEVELOPER) {
      return '/auth/create-developer';
    }

    return '/auth/create-pm';
  })();

  return externalApiClient.post<JwtTokensResponse>(endpointUrl, {
    email,
    name,
    password,
    description,
    position,
    telegramId: telegramId || null,
  });
};

export const removeRefreshToken = async (accessToken: string) => {
  return externalApiClient.post<UserIdResponse>(
    '/auth/logout',
    {},
    { headers: { Authorization: `Bearer ${accessToken}` } },
  );
};

export const login = async (data: LoginRequest) => {
  const { email, password } = data;

  return externalApiClient.post<JwtTokensResponse>('/auth/login', { email, password });
};

export const refreshTokens = async (refreshToken: string) => {
  return axios.post<JwtTokensResponse>(
    '/auth/refresh-tokens',
    {},
    {
      headers: { Authorization: `Bearer ${refreshToken}` },
      baseURL: process.env.NEXT_PUBLIC_EXTERNAL_API_URL,
    },
  );
};

export const createProject = async (data: CreateProjectFormValues & { clientId: number }) => {
  const { title, description, deadline, clientId } = data;

  return externalApiClient.post<UserIdResponse>('/projects/create-project', {
    title,
    description,
    deadline,
    clientId,
    pmId: null,
  });
};
