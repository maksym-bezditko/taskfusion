'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Loader } from '@/components/common/Loader';
import { useProjectById } from '@/hooks/useProjectById';
import { QueryKeys } from '@/types/enums';
import { createDeveloperInvite } from '@/utils/api/mutations';
import { queryClient } from '@/utils/queryClient';
import { InviteDeveloperFormValues, inviteDeveloperSchema } from '@/utils/schemas/inviteDeveloperSchema';

import styles from './invites.module.scss';

type Props = {
  projectId: string;
};

export const InviteDeveloperView = (props: Props) => {
  const { projectId } = props;

  const {
    register,
    handleSubmit,
    formState: { errors, isValidating, isLoading: isLoadingForm },
    setError,
  } = useForm<InviteDeveloperFormValues>({
    resolver: zodResolver(inviteDeveloperSchema),
  });

  const router = useRouter();

  const [isInvitationSent, setIsInvitationSent] = useState(false);

  const { data, isLoading } = useProjectById(projectId);

  const { mutate: createDeveloperInviteMutate } = useMutation({
    mutationFn: (values: InviteDeveloperFormValues) =>
      createDeveloperInvite({
        email: values.email,
        projectId: +projectId,
      }),
    onSuccess: () => {
      setIsInvitationSent(true);

      queryClient.invalidateQueries({
        queryKey: [QueryKeys.PROJECT + projectId],
      });

      setTimeout(() => {
        router.replace(`/projects/${projectId}`);
      }, 3000);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      setError('email', {
        message: error.response?.data.message || 'Unexpected error occurred, please try again later',
      });
    },
  });

  const onSubmit: SubmitHandler<InviteDeveloperFormValues> = (values) => {
    createDeveloperInviteMutate(values);
  };

  if (isLoading || !data) {
    return <Loader />;
  }

  return (
    <div>
      <h1>Invite Developer to project "{data.title}"</h1>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input placeholder="Developer Email" {...register('email')} />

        {errors.email && <p className={styles.validationText}>{errors.email.message}</p>}

        <div className={styles.buttonWrapper}>
          {isInvitationSent ? (
            <p className={styles.invitationText}>Invitation sent!</p>
          ) : (
            <Button
              text="Invite"
              bgColor="orange"
              isFontBold
              textColor="white"
              width="12.75rem"
              disabled={isValidating || isLoadingForm}
            />
          )}
        </div>
      </form>
    </div>
  );
};
