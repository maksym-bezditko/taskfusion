import { ProfileResponse } from '@/types';

import { externalApiClient } from '../externalApiClient';

export const getUserProfile = {
  fetcher: () => externalApiClient.get<ProfileResponse>('/users/profile').then((res) => res.data),
  queryKey: 'profile',
};
