'use client';

import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useMyProfile } from '@/hooks/useUserProfile';

import styles from './MenuNavigation.module.scss';

export const MenuNavigation = () => {
  const { data, isLoading } = useMyProfile();

  const pathname = usePathname();

  if (isLoading) {
    return null;
  }

  return (
    <nav className={styles.nav}>
      {data ? (
        <>
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
        </>
      ) : (
        <>
          <Link
            className={classNames(styles.listItem, {
              [styles.active]: pathname.includes('login'),
            })}
            href="/auth/login"
          >
            Log in
          </Link>

          <Link
            className={classNames(styles.listItem, {
              [styles.active]: pathname.includes('signup'),
            })}
            href="/auth/signup"
          >
            Sign up
          </Link>
        </>
      )}
    </nav>
  );
};
