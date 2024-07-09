import { Header } from "../../global/Header/Header";
import styles from "./MainLayout.module.scss";
import { MenuNavigation } from "../../global/MenuNavigation/MenuNavigation";
import { Path } from "../../global/Path/Path";
import { Logo } from "../../svg/Logo";

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
