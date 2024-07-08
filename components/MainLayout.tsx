import { Header } from "./Header";
import styles from "./MainLayout.module.scss";
import { MenuNavigation } from "./MenuNavigation";
import { Bell } from "./svg/Bell";
import { DefaultAvatar } from "./svg/DefaultAvatar";
import { DownArrow } from "./svg/DownArrow";
import { Letter } from "./svg/Letter";
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

      <div className={styles.main}>
       <Header />

        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
};
