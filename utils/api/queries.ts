import {
  ActionsResponse,
  CommentsResponse,
  InviteResponse,
  ProfileResponse,
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

export const getPmProjects = async (): Promise<ProjectsResponse> => {
  const response = await externalApiClient.get<ProjectsResponse>('/projects/get-pm-projects');

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

export const getInviteById = async (id: string) => {
  const response = await externalApiClient.post<InviteResponse>('/projects/invites/get-invite-by-id', { id });

  return response.data;
};
