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
          [styles.active]: pathname.includes('dashboard'),
        })}
        href="/dashboard"
      >
        Dashboard
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
