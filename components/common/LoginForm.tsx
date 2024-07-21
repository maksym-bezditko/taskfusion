'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';

import { Button } from './Button';
import { Input } from './Input';
import styles from './LoginForm.module.scss';
import { LoginFormValues, loginSchema } from './loginSchema';

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormValues> = () => {};

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Input placeholder="Email" {...register('email')} />

      {errors.email && <p className={styles.validationText}>{errors.email.message}</p>}

      <Input type="password" placeholder="Password" {...register('password')} />

      {errors.password && <p className={styles.validationText}>{errors.password.message}</p>}

      <div className={styles.buttonWrapper}>
        <Button text="Login" bgColor="orange" isFontBold textColor="white" width="12.75rem" />

        <p className={styles.forgotPassword}>Forgot password?</p>
      </div>
    </form>
  );
};
