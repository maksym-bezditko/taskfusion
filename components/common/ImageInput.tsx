'use client';

import Image from 'next/image';
import React from 'react';
import { useRef, useState } from 'react';

import ImagePlaceholder from '@/components/assets/ImagePlaceholder.png';

import { Button } from './Button';
import styles from './ImageInput.module.scss';

export const ImageInput = () => {
  const [file, setFile] = useState<File | null>(null);

  const ref = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (!ref.current) {
      return;
    }

    if (file) {
      return setFile(null);
    }

    ref.current.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const [file] = e.target.files;

    setFile(file);
  };

  return (
    <div className={styles.container}>
      <Image
        src={file ? URL.createObjectURL(file) : ImagePlaceholder.src}
        alt="Avatar"
        className={styles.image}
        width={120}
        height={120}
      />

      <div className={styles.selectorWrapper}>
        <p className={styles.text}>Please upload square image, size less than 1MB</p>

        <div className={styles.buttonWrapper}>
          <Button
            text={file ? 'Reset' : 'Choose File'}
            bgColor={file ? 'blue' : 'blue'}
            isFontBold
            textColor="black"
            onClick={handleClick}
          />

          <p className={styles.chosenFileText}>{file ? file.name : 'No file chosen'}</p>
        </div>
      </div>

      <input type="file" accept="image/*" ref={ref} onChange={handleChange} className={styles.hiddenInput} />
    </div>
  );
};
