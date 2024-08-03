import React from 'react';
import { forwardRef } from 'react';
import { IoSearchOutline } from 'react-icons/io5';

import styles from './DatePicker.module.scss';

type Props = {
  isSearch?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const DatePicker = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {
  const { isSearch = false, ...rest } = props;

  return (
    <div className={styles.datePickerContainer}>
      {isSearch && <IoSearchOutline className={styles.searchIcon} />}
      <input
        type="date"
        className={styles.datePicker}
        style={{ paddingLeft: isSearch ? '2.5rem' : '1.5rem' }}
        ref={ref}
        {...rest}
        min={new Date().toISOString().split('T')[0]}
      />
    </div>
  );
});

DatePicker.displayName = 'DatePicker';
