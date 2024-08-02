'use client';

import { usePathname } from 'next/navigation';

import styles from './Path.module.scss';

export const Path = () => {
  const pathname = usePathname();

  const shouldShowPath = !pathname?.includes('auth');

  if (!shouldShowPath) {
    return null;
  }

  return (
    <p className={styles.path}>
      Dashboard <span>{'>'}</span> Clients <span>{'>'}</span>
    </p>
  );
};
