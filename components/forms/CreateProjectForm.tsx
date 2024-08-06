'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import useSWR from 'swr';

import { UserType } from '@/types';
import { createProject } from '@/utils/api/mutations';
import { getUserProfile } from '@/utils/api/queries';
import { CreateProjectFormValues, createProjectSchema } from '@/utils/schemas/createProjectSchema';

import { Button } from '../common/Button';
import { DatePicker } from '../common/DatePicker';
import { Input } from '../common/Input';

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
  const { data: user } = useSWR(getUserProfile.queryKey, getUserProfile.fetcher);

  const onSubmit: SubmitHandler<CreateProjectFormValues> = async (values) => {
    if (!user) {
      throw new Error('User not found');
    }

    if (user.userType !== UserType.CLIENT) {
      throw new Error('User is not a client to create a project');
    }

    await createProject({
      ...values,
      clientId: user.client.id,
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
