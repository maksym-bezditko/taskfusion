export enum UserType {
  CLIENT = 'Client',
  DEVELOPER = 'Developer',
  PM = 'Project Manager',
}

export enum QueryKeys {
  USER_PROFILE = 'USER_PROFILE',
  PROJECTS = 'PROJECTS',
  PROJECT = 'PROJECT',
  TASKS = 'TASKS',
  TASK = 'TASK',
  ACTIONS = 'ACTIONS',
}

export enum TaskStatus {
  TO_DO = 'To do',
  IN_PROGRESS = 'In progress',
  CLOSED = 'Closed',
  FROZEN = 'Frozen',
}

export enum TaskPriority {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
}
