import React from 'react';

import styles from './FormLayout.module.scss';

export const FormLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.container}>{children}</div>;
};
