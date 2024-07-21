'use client';

import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from './MenuNavigation.module.scss';

export const MenuNavigation = () => {
  const pathname = usePathname();

  const shouldShowPath = !pathname?.includes('auth');

  if (!shouldShowPath) {
    return null;
  }

  return (
    <nav className={styles.nav}>
      <Link
        className={classNames(styles.listItem, {
          [styles.active]: pathname === '/',
        })}
        href="/"
      >
        Clients
      </Link>
      <Link
        className={classNames(styles.listItem, {
          [styles.active]: pathname === '/tasks',
        })}
        href="/tasks"
      >
        Task manager
      </Link>
      <Link
        className={classNames(styles.listItem, {
          [styles.active]: pathname?.startsWith('/task/'),
        })}
        href="/task/1"
      >
        Task
      </Link>
      <Link
        className={classNames(styles.listItem, {
          [styles.active]: pathname === '/profile',
        })}
        href="/profile"
      >
        Profile
      </Link>
    </nav>
  );
};
