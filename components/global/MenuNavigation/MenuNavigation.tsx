"use client";

import { useState } from "react";
import styles from "./MenuNavigation.module.scss";
import classNames from "classnames";

export const MenuNavigation = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <nav className={styles.nav}>
      <li
        className={classNames(styles.listItem, {
          [styles.active]: activeIndex === 0,
        })}
        onClick={() => setActiveIndex(0)}
      >
        Clients
      </li>
      <li
        className={classNames(styles.listItem, {
          [styles.active]: activeIndex === 1,
        })}
        onClick={() => setActiveIndex(1)}
      >
        Task manager
      </li>
      <li
        className={classNames(styles.listItem, {
          [styles.active]: activeIndex === 2,
        })}
        onClick={() => setActiveIndex(2)}
      >
        Inbox
      </li>
      <li
        className={classNames(styles.listItem, {
          [styles.active]: activeIndex === 3,
        })}
        onClick={() => setActiveIndex(3)}
      >
        Contacts
      </li>
    </nav>
  );
};
