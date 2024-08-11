import {
  ActionsResponse,
  ProfileResponse,
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

export const getProjects = async (): Promise<ProjectsResponse> => {
  const response = await externalApiClient.get<ProjectsResponse>('/projects');

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

export const getTaskById = async (taskId: number): Promise<TaskResponse> => {
  const response = await externalApiClient.get<TaskResponse>('/tasks/' + taskId);

  return response.data;
};

export const getActionsByTaskId = async (taskId: number): Promise<ActionsResponse> => {
  const response = await externalApiClient.get<ActionsResponse>('/actions/get-actions-by-task-id/' + taskId);

  return response.data;
};
