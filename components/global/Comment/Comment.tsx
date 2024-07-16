import { Avatar } from "../Avatar/Avatar";
import styles from "./Comment.module.scss";

const DETAILS_STRING =
  "1. Добавлены шаблонные теги для подсчёта часов, потраченных на закрытые задачи.";

export const Comment = () => {
  return (
    <div className={styles.commentWrapper}>
      <div className={styles.commentDetails}>
        <Avatar name="Adyl" />

        <p className={styles.date}>12/04/2021, 6:37 p.m</p>
      </div>

      <p className={styles.text}>{DETAILS_STRING}</p>
    </div>
  );
};
