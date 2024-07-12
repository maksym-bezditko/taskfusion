import styles from "./ColumnItem.module.scss";

import {
  PriorityBadge,
  Props as PriorityBadgeProps,
} from "../PriorityBadge/PriorityBadge";

export type ColumnItemRow = {
  name: string;
  value: string;
};

export type Props = {
  title: string;
  rows: ColumnItemRow[];
  status?: PriorityBadgeProps["priority"];
  text?: string;
};

export const ColumnItem = (props: Props) => {
  const { title, rows, status, text } = props;

  return (
    <div className={styles.wrapper}>
      <div className={styles.headerWrapper}>
        <p className={styles.title}>{title}</p>

        {status && <PriorityBadge priority={status} />}
      </div>

      <div className={styles.contentWrapper}>
        {rows.map((row) => (
          <div key={row.name} className={styles.row}>
            <p className={styles.name}>{row.name}:</p>
            <p className={styles.value}>{row.value}</p>
          </div>
        ))}
      </div>

      <p className={styles.text}>{text}</p>
    </div>
  );
};
