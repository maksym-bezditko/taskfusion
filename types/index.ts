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

export type ClientResponse = {
  id: number;
};

export type DeveloperResponse = {
  id: number;
};

export type PmResponse = {
  id: number;
};

export type ProfileResponse = {
  id: number;
  email: string;
  name: string;
  userType: UserType;
  telegramId?: string;
  description: string;
} & (
  | {
      userType: UserType.CLIENT;
      client: ClientResponse;
    }
  | {
      userType: UserType.DEVELOPER;
      client: DeveloperResponse;
    }
  | {
      userType: UserType.PM;
      client: PmResponse;
    }
);

export type JwtPayload = {
  id: number;
  email: string;
  userType: UserType;
};
