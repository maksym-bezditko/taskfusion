import { ProfileResponse, ProjectResponse, ProjectsResponse } from '@/types';

import { externalApiClient } from '../externalApiClient';

export const getUserProfile = async () => {
  return externalApiClient.get<ProfileResponse>('/users/profile').then((res) => res.data);
};

export const getProjects = async () => {
  return externalApiClient.get<ProjectsResponse>('/projects').then((res) => res.data);
};

export const getProjectById = async (id: string) => {
  return externalApiClient.get<ProjectResponse>('/projects/' + id).then((res) => res.data);
};
