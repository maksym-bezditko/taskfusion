import classNames from "classnames";
import styles from "./ListItem.module.scss";

import { ReactNode } from "react";

export type Props = {
  title: string;
  data: ReactNode[];
  right?: ReactNode;
  type?: "column" | "row";
};

export const ListItem = (props: Props) => {
  const { title, data, type = "column" } = props;

  return (
    <div className={styles.wrapper}>
      <div
        className={classNames(
          type === "row" ? styles.rowWrapper : styles.columnWrapper
        )}
      >
        <p className={styles.title}>{title}</p>

        <div className={type === "column" ? styles.columns : styles.rows}>
          {data}
        </div>
      </div>

      {type === "row" && props.right}
    </div>
  );
};
