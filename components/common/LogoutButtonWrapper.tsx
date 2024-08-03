'use client';

import { useRouter } from 'next/navigation';

import { nextApiClient } from '@/utils/nextApiClient';

import { Button } from './Button';

export const LogoutButtonWrapper = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await nextApiClient.post('/logout');

    router.replace('/');
    router.refresh();
  };

  return <Button text="Logout" bgColor="red" textColor="white" onClick={handleLogout} />;
};
