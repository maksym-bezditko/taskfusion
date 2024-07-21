'use client';

import classNames from 'classnames';
import { ReactNode } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

import styles from './Button.module.scss';

type Props = {
  text: string;
  isModalButton?: boolean;
  icon?: ReactNode;
  textColor?: 'white' | 'black';
  bgColor?: 'orange' | 'red' | 'green' | 'blue' | 'gray';
  width?: string;
  isFontBold?: boolean;
  onClick?: () => void;
};

export const Button = (props: Props) => {
  const {
    text,
    isModalButton,
    icon,
    width,
    bgColor = 'gray',
    textColor = 'black',
    isFontBold = true,
    onClick = () => {},
  } = props;

  return (
    <button
      className={classNames(
        styles.button,
        styles[bgColor],
        styles['textColor_' + textColor],
        isFontBold && styles.fontBold,
      )}
      style={{ width }}
      onClick={onClick}
    >
      {icon} <span>{text}</span>
      {isModalButton && <IoIosArrowDown />}
    </button>
  );
};
