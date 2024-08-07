'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

import DefaultAvatar from '@/components/assets/Avatar.png';
import { Column } from '@/components/common/Column';
import { Props as ColumnItemProps } from '@/components/common/ColumnItem';
import { Details } from '@/components/common/Details';
import { Props as ListItemProps } from '@/components/common/ListItem';
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PROJECTS: ListItemProps[] = [
  {
    title: 'ОсОО “Energi.kg”',
    data: [
      <TextWithIcon key={1} iconName="sunrise" text="12/04/2021" />,
      <TextWithIcon key={2} iconName="sunset" text="12/04/2021" />,
      <TextWithIcon key={3} iconName="people" text="Adyl, Azhar, Arthur" />,
    ],
  },
  {
    title: 'TextLab',
    data: [
      <TextWithIcon key={1} iconName="sunrise" text="12/04/2021" />,
      <TextWithIcon key={2} iconName="sunset" text="12/04/2021" />,
      <TextWithIcon key={3} iconName="people" text="Adyl, Azhar, Arthur" />,
    ],
  },
  {
    title: 'ComLab',
    data: [
      <TextWithIcon key={1} iconName="sunrise" text="12/04/2021" />,
      <TextWithIcon key={2} iconName="sunset" text="12/04/2021" />,
      <TextWithIcon key={3} iconName="people" text="Adyl, Azhar, Arthur" />,
    ],
  },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PROGRESS_COLUMNS: ColumnItemProps[] = [
  {
    title: 'Notifications',
    rows: [
      {
        name: 'Participant',
        value: 'Artur',
      },
      {
        name: 'Date added',
        value: '12/04/2021',
      },
    ],
    status: 'Low',
  },
  {
    title: 'Task types',
    rows: [
      {
        name: 'Participant',
        value: 'Adyl',
      },
      {
        name: 'Date added',
        value: '12/04/2021',
      },
    ],
    status: 'Low',
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
