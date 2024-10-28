import Image from 'next/image';

import DefaultAvatar from '@/components/assets/Avatar.png';
import { Column } from '@/components/common/Column';
import { Details } from '@/components/common/Details';
import { ListView } from '@/components/common/ListView';
import { LogoutButtonWrapper } from '@/components/common/LogoutButtonWrapper';
import { TextWithIcon } from '@/components/common/TextWithIcon';
import { Plus } from '@/components/svg/Plus';
import { ProfileResponse } from '@/types';
import { TaskStatus } from '@/types/enums';
import { getDeveloperProjects, getMyTasksByStatus } from '@/utils/api/queries';
import { mapDeveloperProjectsToListItems, mapTasksToColumns } from '@/utils/helpers';

import styles from './profiles.module.scss';

type Props = {
  profile: ProfileResponse;
};

export const DeveloperProfileView = async (props: Props) => {
  const { profile } = props;

  const projects = await getDeveloperProjects();
  const inProgressTasks = await getMyTasksByStatus(TaskStatus.IN_PROGRESS);
  const closedTasks = await getMyTasksByStatus(TaskStatus.CLOSED);

  const DETAILS = [
    {
      title: 'Position',
      value: profile.userType,
    },
    {
      title: 'Email',
      value: profile.email,
    },
    {
      title: 'Telegram ID',
      value: profile.telegramId || 'Not set',
    },
  ];

  return (
    <div>
      <h1>{profile.name}</h1>

      <div className={styles.contentWrapper}>
        <div className={styles.personalDetailsWrapper}>
          <div className={styles.avatarWrapper}>
            <Image src={DefaultAvatar} alt="Avatar" className={styles.avatar} />
          </div>

          <Details details={profile.description} />

          <Details details={DETAILS} />
        </div>

        <div className={styles.technicalDetailsWrapper}>
          <ListView
            title="Projects"
            rightElement={<TextWithIcon iconName="export" text="Export" isClickable />}
            listItems={mapDeveloperProjectsToListItems(projects)}
          />

          <div className={styles.tasksWrapper}>
            <Column title="In progress" columns={mapTasksToColumns(inProgressTasks)} right={<Plus />} />

            <Column title="Closed" columns={mapTasksToColumns(closedTasks)} right={<Plus />} />
          </div>
        </div>
      </div>

      <div className={styles.logoutButtonWrapper}>
        <LogoutButtonWrapper />
      </div>
    </div>
  );
};
