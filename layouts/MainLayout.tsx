import React from 'react';

import '@/styles/normalize.scss';
import '@/styles/globals.scss';

import { Header } from '@/components/common/Header';
import { MenuNavigation } from '@/components/common/MenuNavigation';
import { Path } from '@/components/common/Path';
import { Logo } from '@/components/svg/Logo';

import styles from './MainLayout.module.scss';

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.container}>
      <aside className={styles.menu}>
        <div>
          <Logo />
        </div>

        <MenuNavigation />
      </aside>

      <div className={styles.main}>
        <Header />

        <main className={styles.content}>
          <Path />

          {children}
        </main>
      </div>
    </div>
  );
};
