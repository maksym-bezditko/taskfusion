'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';

import { Button } from './Button';
import { ImageInput } from './ImageInput';
import { Input } from './Input';
import styles from './SignupForm.module.scss';
import { SignupFormValues, signupSchema } from './signupSchema';

export const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit: SubmitHandler<SignupFormValues> = () => {};

  return (
    <div className={styles.container}>
      <ImageInput />

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input placeholder="Email" {...register('email')} />

        {errors.email && <p className={styles.validationText}>{errors.email.message}</p>}

        <Input placeholder="Name" {...register('name')} />

        {errors.name && <p className={styles.validationText}>{errors.name.message}</p>}

        <Input placeholder="Position" {...register('position')} />

        {errors.position && <p className={styles.validationText}>{errors.position.message}</p>}

        <Input placeholder="Telegram ID (optional)" {...register('telegramId')} />

        {errors.telegramId && <p className={styles.validationText}>{errors.telegramId.message}</p>}

        <div className={styles.buttonWrapper}>
          <Button text="Register" bgColor="orange" isFontBold textColor="white" width="12.75rem" />

          <p className={styles.forgotPassword}>Want to log in?</p>
        </div>
      </form>
    </div>
  );
};
