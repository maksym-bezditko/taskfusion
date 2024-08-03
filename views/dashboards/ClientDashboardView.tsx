import Link from 'next/link';
import { BiPlus } from 'react-icons/bi';

import { Button } from '@/components/common/Button';
import { ListView } from '@/components/common/ListView';
import { TextWithIcon } from '@/components/common/TextWithIcon';
import { ProfileResponse } from '@/types';

import styles from './DashboardView.module.scss';

type Props = {
  profile: ProfileResponse;
};

export const ClientDashboardView = (props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { profile } = props;

  const items = [];

  return (
    <div className="contentWrapper">
      <div className={styles.titleWrapper}>
        <h1>Client Dashboard</h1>

        <Link href="/projects/create">
          <Button text="Create new project" bgColor="orange" textColor="white" icon={<BiPlus />} />
        </Link>
      </div>

      <ListView
        title="Projects"
        rightElement={items.length ? <TextWithIcon iconName="export" text="Export" isClickable /> : null}
        listItems={[]}
      />

      <ListView title="Payments" listItems={[]} />
    </div>
  );
};
