import styles from "./MainLayout.module.scss";
import { MenuNavigation } from "./MenuNavigation";
import { Logo } from "./svg/Logo";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.container}>
      <aside className={styles.menu}>
        <div>
          <Logo />
        </div>

        <MenuNavigation />
      </aside>

      <main className={styles.main}>
        <header className={styles.header}>
          <p>Header</p>
        </header>

        {children}
      </main>
    </div>
  );
};
