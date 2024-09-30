'use client';

import { useMyNotifications } from '@/hooks/useMyNotifications';

import { Bell } from '../svg/Bell';

export const NotificationBell = () => {
  const { data } = useMyNotifications();

  return (
    <div>
      <Bell isActive={Boolean(data?.length)} />
    </div>
  );
};
