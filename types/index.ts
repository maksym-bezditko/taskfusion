export enum UserType {
  CLIENT = 'Client',
  DEVELOPER = 'Developer',
  PM = 'Project Manager',
}

export type JwtTokensResponse = {
  accessToken: string;
  refreshToken: string;
};

export type UserIdResponse = {
  userId: string;
};
