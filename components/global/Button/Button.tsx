import { ReactNode } from "react";
import styles from "./Button.module.scss";
import classNames from "classnames";
import { IoIosArrowDown } from "react-icons/io";

type Props = {
  text: string;
  isModalButton?: boolean;
  icon?: ReactNode;
  textColor?: "white" | "black";
  bgColor?: "orange" | "red" | "green" | "blue" | "gray";
  width?: string;
  isFontBold?: boolean;
};

export const Button = (props: Props) => {
  const {
    text,
    isModalButton,
    icon,
    width,
    bgColor = "gray",
    textColor = "black",
    isFontBold = true,
  } = props;

  return (
    <button
      className={classNames(
        styles.button,
        styles[bgColor],
        styles["textColor_" + textColor],
        isFontBold && styles.fontBold
      )}
      style={{ width }}
    >
      {icon} <span>{text}</span>
      {isModalButton && <IoIosArrowDown />}
    </button>
  );
};
