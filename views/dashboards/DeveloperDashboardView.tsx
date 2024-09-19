import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { ListView } from '@/components/common/ListView';
import { Loader } from '@/components/common/Loader';
import { TextWithIcon } from '@/components/common/TextWithIcon';
import { ProfileResponse } from '@/types';
import { QueryKeys } from '@/types/enums';
import { getDeveloperProjects } from '@/utils/api/queries';
import { mapDeveloperProjectsToListItems } from '@/utils/helpers';

import styles from './DashboardView.module.scss';

type Props = {
  profile: ProfileResponse;
};

export const DeveloperDashboardView = (props: Props) => {
  const { profile } = props;

  const { data, isLoading } = useQuery({ queryKey: [QueryKeys.PROJECTS + profile.id], queryFn: getDeveloperProjects });

  const listItems = useMemo(() => {
    if (!data) {
      return [];
    }

    return mapDeveloperProjectsToListItems(data);
  }, [data]);

  if (isLoading || !data) {
    return <Loader />;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.titleWrapper}>
        <h1>Developer Dashboard</h1>
      </div>

      <div className="contentWrapper">
        <ListView
          title="Projects"
          rightElement={data.length ? <TextWithIcon iconName="export" text="Export" isClickable /> : null}
          listItems={listItems}
        />
      </div>
    </div>
  );
};
