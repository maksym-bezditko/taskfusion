import styles from "./MainLayout.module.scss";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.container}>
      <aside className={styles.menu}>
        <p>Menu</p>
      </aside>

      {children}
    </div>
  );
};
