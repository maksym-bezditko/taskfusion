'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useMemo, useState } from 'react';

import DefaultAvatarImage from '@/components/assets/Avatar.png';
import { QueryKeys } from '@/types/enums';
import { getUserProfile } from '@/utils/api/queries';

import { Bell } from '../svg/Bell';
import { DownArrow } from '../svg/DownArrow';
import { Letter } from '../svg/Letter';

import styles from './Header.module.scss';
import { Input } from './Input';
import { Loader } from './Loader';

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [isLetterActive] = useState(false);
  const [isBellActive] = useState(false);

  const pathname = usePathname();

  const { data, isLoading } = useQuery({
    queryKey: [QueryKeys.USER_PROFILE],
    queryFn: getUserProfile,
    retry: false,
  });

  const shouldShowHeader = !pathname?.includes('auth');

  const profileContent = useMemo(() => {
    if (isLoading) {
      return <Loader isSmall />;
    }

    if (!data) {
      return null;
    }

    return (
      <div className={styles.profileContainer}>
        <Image src={DefaultAvatarImage.src} alt="Avatar" width={40} height={40} />

        <p>{data.name}</p>

        <div className={styles.downArrow} onClick={() => setOpen((prev) => !prev)}>
          <DownArrow isOpen={open} />
        </div>
      </div>
    );
  }, [data, isLoading, open]);

  if (!shouldShowHeader) {
    return null;
  }

  return (
    <header className={styles.header}>
      <Input isSearch placeholder="Search" />

      <div className={styles.notificationIndicators}>
        <Bell isActive={isBellActive} />

        <Letter isActive={isLetterActive} />
      </div>

      <div className={styles.profileContainerWrapper}>{profileContent}</div>
    </header>
  );
};
