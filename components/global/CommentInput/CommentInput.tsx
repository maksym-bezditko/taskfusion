import { Button } from "../Button/Button";
import styles from "./CommentInput.module.scss";

export const CommentInput = () => {
  return (
    <div className={styles.commentInputWrapper}>
      <textarea className={styles.commentInput} placeholder="Add comment..." />

      <Button text="Publish" bgColor="orange" textColor="white" width="12.75rem" />
    </div>
  );
};
