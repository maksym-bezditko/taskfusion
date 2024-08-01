'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';

import { Button } from './Button';

export const LogoutButtonWrapper = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await axios.post('/api/logout');

    router.replace('/');
    router.refresh();
  };

  return <Button text="Logout" bgColor="red" textColor="white" onClick={handleLogout} />;
};
