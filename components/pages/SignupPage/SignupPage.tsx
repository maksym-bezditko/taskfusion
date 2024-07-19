import { SignupForm } from "@/components/global/SignupForm/SignupForm";
import styles from "./SignupPage.module.scss";

export const SignupPage = () => {
  return (
    <div className={styles.wrapper}>
      <h1>Signup</h1>

      <div className={styles.contentWrapper}>
        <SignupForm />
      </div>
    </div>
  );
};
