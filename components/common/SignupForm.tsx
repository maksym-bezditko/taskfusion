'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { UserType } from '@/types';

import { SignupFormValues, signupSchema } from '../schemas/signupSchema';

import { Button } from './Button';
import { ImageInput } from './ImageInput';
import { Input } from './Input';
import { Select } from './Select';
import styles from './SignupForm.module.scss';

const userOptions = Object.values(UserType).map((value) => ({
  value,
  label: value,
}));

export const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const [file, setFile] = useState<File | null>(null);

  const onSubmit: SubmitHandler<SignupFormValues> = (values: SignupFormValues) => {
    console.log(file, values);
  };

  return (
    <div className={styles.container}>
      <ImageInput file={file} setFile={setFile} />

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Select options={userOptions} placeholder="Position type" {...register('position')} />

        {errors.position && <p className={styles.validationText}>{errors.position.message}</p>}

        <Input placeholder="Position Description" multiline {...register('positionDescription')} />

        {errors.positionDescription && <p className={styles.validationText}>{errors.positionDescription.message}</p>}

        <Input placeholder="Email" {...register('email')} />

        {errors.email && <p className={styles.validationText}>{errors.email.message}</p>}

        <Input placeholder="Name" {...register('name')} />

        {errors.name && <p className={styles.validationText}>{errors.name.message}</p>}

        <Input placeholder="Telegram ID (optional)" {...register('telegramId')} />

        {errors.telegramId && <p className={styles.validationText}>{errors.telegramId.message}</p>}

        <Input placeholder="Password" type="password" {...register('password')} />

        {errors.password && <p className={styles.validationText}>{errors.password.message}</p>}

        <Input placeholder="Confirm Password" type="password" {...register('confirmPassword')} />

        {errors.confirmPassword && <p className={styles.validationText}>{errors.confirmPassword.message}</p>}

        <div className={styles.buttonWrapper}>
          <Button text="Register" bgColor="orange" isFontBold textColor="white" width="12.75rem" />

          <Link href="/auth/login" className={styles.forgotPassword}>
            Want to log in?
          </Link>
        </div>
      </form>
    </div>
  );
};
