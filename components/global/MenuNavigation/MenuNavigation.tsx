"use client";

import styles from "./MenuNavigation.module.scss";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const MenuNavigation = () => {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      <Link
        className={classNames(styles.listItem, {
          [styles.active]: pathname === "/",
        })}
        href="/"
      >
        Clients
      </Link>
      <Link
        className={classNames(styles.listItem, {
          [styles.active]: pathname === "/tasks",
        })}
        href="/tasks"
      >
        Task manager
      </Link>
      <Link
        className={classNames(styles.listItem, {
          [styles.active]: pathname === "/inbox",
        })}
        href=""
      >
        Inbox
      </Link>
      <Link
        className={classNames(styles.listItem, {
          [styles.active]: pathname === "/contacts",
        })}
        href=""
      >
        Contacts
      </Link>
    </nav>
  );
};
