import { useMemo } from 'react';

import { ListView } from '@/components/common/ListView';
import { Loader } from '@/components/common/Loader';
import { TextWithIcon } from '@/components/common/TextWithIcon';
import { useDeveloperProjects } from '@/hooks/useDeveloperProjects';
import { mapDeveloperProjectsToListItems } from '@/utils/helpers';

import styles from './dashboard.module.scss';

export const DeveloperDashboardView = () => {
  const { data, isLoading } = useDeveloperProjects();

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
