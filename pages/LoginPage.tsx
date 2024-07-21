import { LoginForm } from '@/components/common/LoginForm';

import styles from './LoginPage.module.scss';

export const LoginPage = () => {
  return (
    <div className={styles.wrapper}>
      <h1>Login</h1>

      <div className={styles.contentWrapper}>
        <LoginForm />
      </div>
    </div>
  );
};
