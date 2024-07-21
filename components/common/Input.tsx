import React from 'react';
import { forwardRef } from 'react';
import { IoSearchOutline } from 'react-icons/io5';

import styles from './Input.module.scss';

type Props = {
  isSearch?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {
  const { isSearch = false, ...rest } = props;

  return (
    <div className={styles.searchContainer}>
      {isSearch && <IoSearchOutline className={styles.searchIcon} />}

      <input className={styles.search} style={{ paddingLeft: isSearch ? '2.5rem' : '1.5rem' }} ref={ref} {...rest} />
    </div>
  );
});

Input.displayName = 'Input';
