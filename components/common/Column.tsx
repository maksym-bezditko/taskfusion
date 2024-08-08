import { ReactNode } from 'react';

import { ColumnItem, Props as ColumnItemProps } from '@/components/common/ColumnItem';

import styles from './Column.module.scss';
import { NoData } from './NoData';

type Props = {
  title: string;
  columns?: ColumnItemProps[];
  right?: ReactNode;
};

export const Column = (props: Props) => {
  const { title, columns, right } = props;

  return (
    <div className={styles.wrapper}>
      <div className={styles.headerWrapper}>
        <p className={styles.title}>{title}</p>

        {right}
      </div>

      {columns?.length ? (
        <div className={styles.contentWrapper}>
          {columns.map((column) => (
            <ColumnItem key={column.title} {...column} />
          ))}
        </div>
      ) : (
        <NoData />
      )}
    </div>
  );
};
