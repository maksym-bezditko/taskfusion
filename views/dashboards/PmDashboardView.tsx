import { useQuery } from '@tanstack/react-query';
import moment from 'moment-timezone';

import { ListView } from '@/components/common/ListView';
import { Loader } from '@/components/common/Loader';
import { TextWithIcon } from '@/components/common/TextWithIcon';
import { ProfileResponse } from '@/types';
import { QueryKeys } from '@/types/enums';
import { getPmProjects } from '@/utils/api/queries';

import styles from './DashboardView.module.scss';

type Props = {
  profile: ProfileResponse;
};

export const PmDashboardView = (props: Props) => {
  const { profile } = props;

  const { data, isLoading } = useQuery({ queryKey: [QueryKeys.PROJECTS + profile.id], queryFn: getPmProjects });

  if (isLoading || !data) {
    return <Loader />;
  }

  return (
    <div className={styles.wrapper}>
      <h1>Project Manager Dashboard</h1>

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
              <TextWithIcon key={3} iconName="people" text="Adyl, Azhar, Arthur" />,
            ],
            right: project.id,
            href: `projects/${project.id}`,
          }))}
        />
      </div>
    </div>
  );
};
