import styles from "./PriorityBadge.module.scss";

import classNames from "classnames";

export type Props = {
  priority: "High" | "Medium" | "Low";
};

export const PriorityBadge = (props: Props) => {
  const { priority } = props;

  return (
    <div
      className={classNames(styles.wrapper, {
        [styles.green]: priority === "Low",
        [styles.orange]: priority === "Medium",
        [styles.red]: priority === "High",
      })}
    >
      {priority}
    </div>
  );
};
