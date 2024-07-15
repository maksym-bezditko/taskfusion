import { ReactNode } from "react";
import styles from "./Button.module.scss";
import classNames from "classnames";

type Props = {
  text: string;
  icon?: ReactNode;
  color?: "orange" | "red" | "green";
};

export const Button = (props: Props) => {
  const { text, icon, color = "orange" } = props;

  return (
    <button className={classNames(styles.button, styles[color])}>
      {icon} <span>{text}</span>
    </button>
  );
};
