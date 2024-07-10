import styles from "./ListItem.module.scss";

import { ReactNode } from "react";

export type Props = {
  title: string;
  columns: ReactNode[];
};

export const ListItem = (props: Props) => {
	const { title, columns } = props;

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>{title}</p>

			<div className={styles.columns}>
      	{columns}
			</div>
    </div>
  );
};
