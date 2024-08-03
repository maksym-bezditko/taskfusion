'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';

import { UserType } from '@/types';
import { api } from '@/utils/api';

import { CreateProjectFormValues, createProjectSchema } from '../../schemas/createProjectSchema';
import { Button } from '../Button';
import { DatePicker } from '../DatePicker';
import { Input } from '../Input';

import styles from './Form.module.scss';

export const CreateProjectForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProjectFormValues>({
    resolver: zodResolver(createProjectSchema),
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<CreateProjectFormValues> = async (values) => {
    const user = await api.getUserProfile();

    if (!user) {
      throw new Error('User not found');
    }

    if (user.data.userType !== UserType.CLIENT) {
      throw new Error('User is not a client to create a project');
    }

    await api.createProject({
      ...values,
      clientId: user.data.client.id,
    });

    router.push('/dashboard');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Input placeholder="Title" {...register('title')} />

      {errors.title && <p className={styles.validationText}>{errors.title.message}</p>}

      <Input placeholder="Description" multiline {...register('description')} />

      {errors.description && <p className={styles.validationText}>{errors.description.message}</p>}

      <DatePicker placeholder="Deadline" {...register('deadline')} />

      {errors.deadline && <p className={styles.validationText}>{errors.deadline.message}</p>}

      {errors.root && <p className={styles.validationText}>{errors.root.message}</p>}

      <div className={styles.buttonWrapper}>
        <Button text="Login" bgColor="orange" isFontBold textColor="white" width="12.75rem" />

        <p className={styles.forgotPassword}>Forgot password?</p>
      </div>
    </form>
  );
};
