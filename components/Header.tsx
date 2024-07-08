"use client";

import { useState } from "react";
import styles from "./Header.module.scss";

import { Bell } from "./svg/Bell";
import { DefaultAvatar } from "./svg/DefaultAvatar";
import { DownArrow } from "./svg/DownArrow";
import { Letter } from "./svg/Letter";

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [isLetterActive] = useState(false);
  const [isBellActive] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.searchContainer}>
        <input className={styles.search} placeholder="Search" />
      </div>

      <div className={styles.notificationIndicators}>
        <Bell isActive={isBellActive} />

        <Letter isActive={isLetterActive} />
      </div>

      <div className={styles.profileContainer}>
        <DefaultAvatar />

        <p>Azhar I.</p>

        <div
          className={styles.downArrow}
          onClick={() => setOpen((prev) => !prev)}
        >
          <DownArrow isOpen={open} />
        </div>
      </div>
    </header>
  );
};
