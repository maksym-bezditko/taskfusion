'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';

import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Loader } from '@/components/common/Loader';
import { QueryKeys } from '@/types/enums';
import { checkPmEmail, getProjectById } from '@/utils/api/queries';
import { InvitePmFormValues, invitePmSchema } from '@/utils/schemas/invitePmSchema';

import styles from './InvitePmView.module.scss';

type Props = {
  projectId: string;
};

export const InvitePmView = (props: Props) => {
  const { projectId } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<InvitePmFormValues>({
    resolver: zodResolver(invitePmSchema),
  });

  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: [QueryKeys.PROJECT + projectId],
    queryFn: () => getProjectById(projectId),
  });

  const { mutate: validatePmEmail } = useMutation({
    mutationFn: (values: InvitePmFormValues) => checkPmEmail(values.email),
    onSuccess: () => {
      router.push('/dashboard');
    },
    onError: (error) => {
      setError('email', { message: error.message });
    },
  });

  const onSubmit: SubmitHandler<InvitePmFormValues> = (values) => {
    validatePmEmail(values);
  };

  if (isLoading || !data) {
    return <Loader />;
  }

  return (
    <div>
      <h1>Invite PM to project "{data.title}"</h1>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input placeholder="PM Email" {...register('email')} />

        {errors.email && <p className={styles.validationText}>{errors.email.message}</p>}

        <div className={styles.buttonWrapper}>
          <Button text="Invite" bgColor="orange" isFontBold textColor="white" width="12.75rem" />
        </div>
      </form>
    </div>
  );
};
