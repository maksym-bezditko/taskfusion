import {
  ActionsResponse,
  CommentsResponse,
  DeveloperInviteResponse,
  PmInviteResponse,
  PmProjectResponse,
  ProfileResponse,
  ProjectDeveloperUsersResponse,
  ProjectPmUserResponse,
  ProjectResponse,
  ProjectsResponse,
  TaskResponse,
  TasksResponse,
} from '@/types';
import { TaskStatus } from '@/types/enums';

import { externalApiClient } from '../externalApiClient';

export const getUserProfile = async (): Promise<ProfileResponse> => {
  const response = await externalApiClient.get<ProfileResponse>('/users/profile');

  return response.data;
};

export const getClientProjects = async (): Promise<ProjectsResponse> => {
  const response = await externalApiClient.get<ProjectsResponse>('/projects/get-client-projects');

  return response.data;
};

export const getPmProjects = async (): Promise<PmProjectResponse> => {
  const response = await externalApiClient.get<PmProjectResponse>('/projects/get-pm-projects');

  return response.data;
};

export const getProjectById = async (id: string): Promise<ProjectResponse> => {
  const response = await externalApiClient.get<ProjectResponse>(`/projects/${id}`);

  return response.data;
};

export const getTasksByStatus = async (projectId: number, taskStatus: TaskStatus): Promise<TasksResponse> => {
  const response = await externalApiClient.post<TasksResponse>('/tasks/get-tasks-by-status', { projectId, taskStatus });

  return response.data;
};

export const getProjectPmUser = async (projectId: number): Promise<ProjectPmUserResponse> => {
  try {
    const response = await externalApiClient.post<ProjectPmUserResponse>('/projects/get-project-pm-user', {
      projectId,
    });

    return response.data;
  } catch (error) {
    return null;
  }
};

export const getProjectDeveloperUsers = async (projectId: number): Promise<ProjectDeveloperUsersResponse> => {
  const response = await externalApiClient.post<ProjectDeveloperUsersResponse>(
    '/projects/get-project-developer-users',
    {
      projectId,
    },
  );

  return response.data;
};

export const getTaskById = async (taskId: number): Promise<TaskResponse> => {
  const response = await externalApiClient.get<TaskResponse>('/tasks/' + taskId);

  return response.data;
};

export const getActionsByTaskId = async (taskId: number): Promise<ActionsResponse> => {
  const response = await externalApiClient.get<ActionsResponse>('/actions/get-actions-by-task-id/' + taskId);

  return response.data;
};

export const getCommentsByTaskId = async (taskId: number): Promise<CommentsResponse> => {
  const response = await externalApiClient.get<CommentsResponse>('/comments/get-comments-by-task-id/' + taskId);

  return response.data;
};

export const checkPmEmail = async (email: string) => {
  const response = await externalApiClient.post('/users/check-pm-email', { email });

  return response.data;
};

export const checkDeveloperEmail = async (email: string) => {
  const response = await externalApiClient.post('/users/check-developer-email', { email });

  return response.data;
};

export const getPmInviteById = async (id: string) => {
  const response = await externalApiClient.post<PmInviteResponse>('/projects/invites/get-pm-invite-by-id', { id });

  return response.data;
};

export const getDeveloperInviteById = async (id: string) => {
  const response = await externalApiClient.post<DeveloperInviteResponse>(
    '/projects/invites/get-developer-invite-by-id',
    {
      id,
    },
  );

  return response.data;
};
