import { ReactNode } from 'react';

import { ColumnItem, Props as ColumnItemProps } from '@/components/common/ColumnItem';

import styles from './Column.module.scss';
import { Loader } from './Loader';
import { NoData } from './NoData';

type Props = {
  title: string;
  columns?: ColumnItemProps[];
  right?: ReactNode;
  isLoading?: boolean;
};

export const Column = (props: Props) => {
  const { title, columns, right, isLoading } = props;

  const contentItems = () => {
    if (isLoading) {
      return <Loader isSmall />;
    }

    if (!columns?.length) {
      return <NoData />;
    }

    return (
      <div className={styles.contentWrapper}>
        {columns.map((column) => (
          <ColumnItem key={column.id} {...column} />
        ))}
      </div>
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.headerWrapper}>
        <p className={styles.title}>{title}</p>

        {right}
      </div>

      {contentItems()}
    </div>
  );
};
