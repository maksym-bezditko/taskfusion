import classNames from "classnames";
import styles from "./Status.module.scss";

type Props = {
  status: "Active" | "Closed";
};

export const Status = (props: Props) => {
  const { status } = props;

  return (
    <div className={styles.statusWrapper}>
      <div
        className={classNames(
          status === "Active"
            ? styles.activeDotWrapper
            : styles.closedDotWrapper
        )}
      />

      <p>{status}</p>
    </div>
  );
};
