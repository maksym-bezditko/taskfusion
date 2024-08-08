import classNames from 'classnames';
import { ReactNode } from 'react';

import styles from './Details.module.scss';

export type Detail = {
  title: string;
  value: ReactNode;
};

type Props = {
  details: Detail[] | string;
  isTwoColumns?: boolean;
};

export const Details = (props: Props) => {
  const { details, isTwoColumns } = props;

  if (typeof details === 'string') {
    return <div className={classNames(styles.details, styles.stringDetails)}>{details}</div>;
  }

  return (
    <div
      className={classNames(styles.details, {
        [styles.twoColumns]: isTwoColumns,
      })}
    >
      {details.map((detail) => (
        <div key={detail.title} className={styles.detailItem}>
          <p className={styles.detailTitle}>{detail.title}:</p>

          <div className={styles.detailValue}>{detail.value}</div>
        </div>
      ))}
    </div>
  );
};
