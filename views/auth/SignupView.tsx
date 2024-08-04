import { SignupForm } from '@/components/common/forms/SignupForm';

import styles from './SignupView.module.scss';

export const SignupPage = () => {
  return (
    <div className={styles.wrapper}>
      <h1>Signup</h1>

      <div className="contentWrapper">
        <SignupForm />
      </div>
    </div>
  );
};
