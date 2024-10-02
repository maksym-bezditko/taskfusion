'use client';

import { useState } from 'react';

import { useMyNotifications } from '@/hooks/useMyNotifications';

import { Bell } from '../svg/Bell';

import styles from './NotificationBell.module.scss';
import { NotificationList } from './NotificationList';

export const NotificationBell = () => {
  const { data } = useMyNotifications();
  const [isOpen, setIsOpen] = useState(false);

  const handleBellClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={styles.bellContainer}>
      <div className={styles.bell} onClick={handleBellClick}>
        <Bell isActive={Boolean(data?.length)} />
      </div>

      {isOpen && <NotificationList notifications={data || []} setIsOpen={setIsOpen} />}
    </div>
  );
};
