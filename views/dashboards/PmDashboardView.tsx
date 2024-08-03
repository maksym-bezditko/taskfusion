import { ProfileResponse } from '@/types';

import styles from './DashboardView.module.scss';

type Props = {
  profile: ProfileResponse;
};

export const PmDashboardView = (props: Props) => {
  const { profile } = props;

  return (
    <div className={styles.container}>
      <h1>PM Dashboard of {profile.name}</h1>
    </div>
  );
};
