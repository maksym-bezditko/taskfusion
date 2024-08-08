'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

import DefaultAvatar from '@/components/assets/Avatar.png';
import { Column } from '@/components/common/Column';
import { Details } from '@/components/common/Details';
import { ListView } from '@/components/common/ListView';
import { Loader } from '@/components/common/Loader';
import { LogoutButtonWrapper } from '@/components/common/LogoutButtonWrapper';
import { TextWithIcon } from '@/components/common/TextWithIcon';
import { Plus } from '@/components/svg/Plus';
import { QueryKeys } from '@/types/enums';
import { getUserProfile } from '@/utils/api/queries';

import styles from './ProfileView.module.scss';

const PERFORMANCE_DETAILS = [
  {
    title: 'Hours worked this month',
    value: '0',
  },
  {
    title: 'Number of tasks in progress',
    value: '0',
  },
  {
    title: 'Number of closed tasks',
    value: '0',
  },
  {
    title: 'Number of frozen tasks',
    value: '0',
  },
];

export const ProfilePage = () => {
  const { data, isLoading, error } = useQuery({ queryKey: [QueryKeys.USER_PROFILE], queryFn: getUserProfile });

  if (isLoading) {
    return <Loader />;
  }

  if (error || !data) {
    console.error(error);

    return 'error';
  }

  const DETAILS = [
    {
      title: 'Position',
      value: data.userType,
    },
    {
      title: 'Email',
      value: data.email,
    },
    {
      title: 'Telegram ID',
      value: '720443189',
    },
  ];

  return (
    <div>
      <h1>{data.name}</h1>

      <div className={styles.contentWrapper}>
        <div className={styles.personalDetailsWrapper}>
          <div className={styles.avatarWrapper}>
            <Image src={DefaultAvatar} alt="Avatar" className={styles.avatar} />
          </div>

          <Details details={DETAILS} />

          <Details details={PERFORMANCE_DETAILS} />
        </div>

        <div className={styles.technicalDetailsWrapper}>
          <ListView
            title="Projects"
            rightElement={<TextWithIcon iconName="export" text="Export" isClickable />}
            listItems={[]}
          />

          <div className={styles.tasksWrapper}>
            <Column title="In progress" columns={[]} right={<Plus />} />

            <Column title="Closed" columns={[]} right={<Plus />} />
          </div>
        </div>
      </div>

      <div className={styles.logoutButtonWrapper}>
        <LogoutButtonWrapper />
      </div>
    </div>
  );
};
