'use client';

import { useState } from 'react';

import { useMyNotifications } from '@/hooks/useMyNotifications';
import { useMyProfile } from '@/hooks/useUserProfile';

import { Bell } from '../svg/Bell';

import styles from './NotificationBell.module.scss';
import { NotificationList } from './NotificationList';

export const NotificationBell = () => {
  const { data: profile } = useMyProfile();
  const { data } = useMyNotifications({
    enabled: Boolean(profile),
  });
  const [isOpen, setIsOpen] = useState(false);

  const handleBellClick = () => {
    setIsOpen((prev) => !prev);
  };

  if (!profile) {
    return null;
  }

  return (
    <div className={styles.bellContainer}>
      <div className={styles.bell} onClick={handleBellClick}>
        <Bell isActive={data?.every((notification) => !notification.isRead)} />
      </div>

      {isOpen && (
        <NotificationList
          notifications={data?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) || []}
          setIsOpen={setIsOpen}
        />
      )}
    </div>
  );
};
