import axios from 'axios';

import { LoginRequest } from '@/app/api/login/route';
import { SignupRequest } from '@/app/api/signup/route';
import { CreateProjectFormValues } from '@/utils/schemas/createProjectSchema';
import { JwtTokensResponse, ProfileResponse, UserIdResponse, UserType } from '@/types';

import { externalApiClient } from './externalApiClient';

const getUserProfile = async () => {
  try {
    return externalApiClient.get<ProfileResponse>('/users/profile');
  } catch (error) {
    return null;
  }
};

const createUser = async (data: SignupRequest) => {
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

const removeRefreshToken = async (accessToken: string) => {
  return externalApiClient.post<UserIdResponse>(
    '/auth/logout',
    {},
    { headers: { Authorization: `Bearer ${accessToken}` } },
  );
};

const login = async (data: LoginRequest) => {
  const { email, password } = data;

  return externalApiClient.post<JwtTokensResponse>('/auth/login', { email, password });
};

const refreshTokens = async (refreshToken: string) => {
  return axios.post<JwtTokensResponse>(
    '/auth/refresh-tokens',
    {},
    {
      headers: { Authorization: `Bearer ${refreshToken}` },
      baseURL: process.env.NEXT_PUBLIC_EXTERNAL_API_URL,
    },
  );
};

const createProject = async (data: CreateProjectFormValues & { clientId: number }) => {
  const { title, description, deadline, clientId } = data;

  return externalApiClient.post<UserIdResponse>('/projects/create-project', {
    title,
    description,
    deadline,
    clientId,
  });
};

export const api = {
  login,
  createUser,
  getUserProfile,
  removeRefreshToken,
  createProject,
  refreshTokens,
};
