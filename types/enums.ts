export enum UserType {
  CLIENT = 'Client',
  DEVELOPER = 'Developer',
  PM = 'Project Manager',
}

export enum QueryKeys {
  PROJECT_PM_USER = 'PROJECT_PM_USER',
  PROJECT_DEVELOPER_USERS = 'PROJECT_DEVELOPER_USERS',
  USER_PROFILE = 'USER_PROFILE',
  PROJECTS = 'PROJECTS',
  MY_TASKS_BY_STATUS = 'MY_TASKS_BY_STATUS',
  PROJECT = 'PROJECT',
  TASKS = 'TASKS',
  TASK = 'TASK',
  ACTIONS = 'ACTIONS',
  COMMENTS = 'COMMENTS',
  PM_INVITES = 'PM_INVITES',
  DEV_INVITES = 'DEV_INVITES',
  PAYMENT_REQUESTS = 'PAYMENT_REQUESTS',
  PAYMENT_REQUEST = 'PAYMENT_REQUEST',
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

export enum InviteStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

export enum PaymentRequestStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}
