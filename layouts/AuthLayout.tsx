import React from 'react';

import styles from './AuthLayout.module.scss';

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.container}>{children}</div>;
};
