import moment from 'moment-timezone';
import Link from 'next/link';
import { BiPlus } from 'react-icons/bi';

import { Button } from '@/components/common/Button';
import { ListView } from '@/components/common/ListView';
import { Loader } from '@/components/common/Loader';
import { TextWithIcon } from '@/components/common/TextWithIcon';
import { useClientProjects } from '@/hooks/useClientProjects';

import styles from './dashboard.module.scss';

export const ClientDashboardView = () => {
  const { data, isLoading } = useClientProjects();

  if (isLoading || !data) {
    return <Loader />;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.titleWrapper}>
        <h1>Client Dashboard</h1>

        <Link href="projects/create">
          <Button text="Create new project" bgColor="orange" textColor="white" icon={<BiPlus />} />
        </Link>
      </div>

      <div className="contentWrapper">
        <ListView
          title="Projects"
          rightElement={data.length ? <TextWithIcon iconName="export" text="Export" isClickable /> : null}
          listItems={data.map((project) => ({
            title: project.title,
            data: [
              <TextWithIcon key={1} iconName="sunrise" text={moment(project.deadline).format('MM/DD/YYYY, h:mm a')} />,
              <TextWithIcon
                key={2}
                iconName="sunset"
                text={moment.utc(project.deadline).local().format('MM/DD/YYYY, h:mm a')}
              />,
              <TextWithIcon
                key={3}
                iconName="people"
                text={
                  project.users
                    .map((user) => user.name)
                    .join(', ')
                    .trim() || 'No participants'
                }
              />,
            ],
            right: project.id,
            href: `projects/${project.id}`,
          }))}
        />

        <ListView title="Payments" listItems={[]} />
      </div>
    </div>
  );
};