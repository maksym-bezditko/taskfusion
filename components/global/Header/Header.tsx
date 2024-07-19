"use client";

import { useState } from "react";
import styles from "./Header.module.scss";

import { Bell } from "../../svg/Bell";
import { DefaultAvatar } from "../../svg/DefaultAvatar";
import { DownArrow } from "../../svg/DownArrow";
import { Letter } from "../../svg/Letter";
import { IoSearchOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";
import { Input } from "../Input/Input";

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [isLetterActive] = useState(false);
  const [isBellActive] = useState(false);

  const pathname = usePathname();

  const shouldShowHeader = !pathname.includes("auth");

  if (!shouldShowHeader) {
    return null;
  }

  return (
    <header className={styles.header}>
      <Input isSearch placeholder="Search" />

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
