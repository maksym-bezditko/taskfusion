'use client';

import { useRouter } from 'next/navigation';

import { QueryKeys } from '@/types/enums';
import { nextApiClient } from '@/utils/nextApiClient';
import { queryClient } from '@/utils/queryClient';

import { Button } from './Button';

export const LogoutButtonWrapper = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await nextApiClient.post('/logout');

    queryClient.removeQueries({
      queryKey: [QueryKeys.USER_PROFILE],
    });
    router.replace('/dashboard');
    router.refresh();
  };

  return <Button text="Logout" bgColor="red" textColor="white" onClick={handleLogout} />;
};
