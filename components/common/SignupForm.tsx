'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { SignupResponse } from '@/app/api/signup/route';
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
    setError,
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const [file, setFile] = useState<File | null>(null);

  const router = useRouter();

  const onSubmit: SubmitHandler<SignupFormValues> = async (values: SignupFormValues) => {
    try {
      const { data } = await axios.post<SignupResponse>('/api/signup', values);

      if (data.success) {
        router.replace('/');
        router.refresh();
      }
    } catch (error) {
      setError('root', { message: 'User with this email already exists' });
    }
  };

  return (
    <div className={styles.container}>
      <ImageInput file={file} setFile={setFile} />

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Select options={userOptions} placeholder="Position type" {...register('position')} />

        {errors.position && <p className={styles.validationText}>{errors.position.message}</p>}

        <Input placeholder="Email" {...register('email')} />

        {errors.email && <p className={styles.validationText}>{errors.email.message}</p>}

        <Input placeholder="Name" {...register('name')} />

        {errors.name && <p className={styles.validationText}>{errors.name.message}</p>}

        <Input placeholder="Description" multiline {...register('description')} />

        {errors.description && <p className={styles.validationText}>{errors.description.message}</p>}

        <Input placeholder="Telegram ID (optional)" type="number" {...register('telegramId')} />

        {errors.telegramId && <p className={styles.validationText}>{errors.telegramId.message}</p>}

        <Input placeholder="Password" type="password" {...register('password')} />

        {errors.password && <p className={styles.validationText}>{errors.password.message}</p>}

        <Input placeholder="Confirm Password" type="password" {...register('confirmPassword')} />

        {errors.confirmPassword && <p className={styles.validationText}>{errors.confirmPassword.message}</p>}

        {errors.root?.message && <p className={styles.validationText}>{errors.root.message}</p>}

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
