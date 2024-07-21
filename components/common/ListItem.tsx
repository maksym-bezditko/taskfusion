import classNames from 'classnames';
import { ReactNode } from 'react';

import styles from './ListItem.module.scss';

export type Props = {
  title: string;
  data: ReactNode[];
  right?: ReactNode;
  type?: 'column' | 'row';
};

export const ListItem = (props: Props) => {
  const { title, data, type = 'column' } = props;

  return (
    <div className={styles.wrapper}>
      <div className={classNames(type === 'row' ? styles.rowWrapper : styles.columnWrapper)}>
        <p className={styles.title}>{title}</p>

        <div className={type === 'column' ? styles.columns : styles.rows}>{data}</div>
      </div>

      {type === 'row' && props.right}
    </div>
  );
};
