import styles from "./Sidebar.module.scss";

import { MenuNavigation } from "../MenuNavigation/MenuNavigation";
import { Logo } from "../../svg/Logo";

export const Sidebar = () => {
  return (
    <aside className={styles.menu}>
      <div>
        <Logo />
      </div>

      <MenuNavigation />
    </aside>
  );
};
