import styles from "./Path.module.scss";

export const Path = () => {
  return (
    <p className={styles.path}>
      Dashboard <span>{">"}</span> Clients <span>{">"}</span>
    </p>
  );
};
