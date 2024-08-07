'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { QueryKeys } from '@/types/enums';
import { nextApiClient } from '@/utils/nextApiClient';

import { Button } from './Button';

export const LogoutButtonWrapper = () => {
  const router = useRouter();
  const client = useQueryClient();

  const handleLogout = async () => {
    await nextApiClient.post('/logout');

    client.removeQueries({
      queryKey: [QueryKeys.USER_PROFILE],
    });
    router.replace('/');
    router.refresh();
  };

  return <Button text="Logout" bgColor="red" textColor="white" onClick={handleLogout} />;
};
