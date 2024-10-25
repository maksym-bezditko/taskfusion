'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';

import DefaultAvatarImage from '@/components/assets/Avatar.png';
import { useMyProfile } from '@/hooks/useUserProfile';

import styles from './ProfileContent.module.scss';

export const ProfileContent = () => {
  const { data } = useMyProfile();

  const profileContent = useMemo(() => {
    if (!data) {
      return null;
    }

    return (
      <Link href="/profile">
        <div className={styles.profileContainer}>
          <Image src={DefaultAvatarImage.src} alt="Avatar" width={40} height={40} />

          <p>{data.name}</p>
        </div>
      </Link>
    );
  }, [data]);

  return <div className={styles.profileContainerWrapper}>{profileContent}</div>;
};
