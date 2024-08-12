'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';

import { CreateCommentFormValues, createCommentSchema } from '@/utils/schemas/createCommentSchema';

import { Button } from './Button';
import styles from './CommentInput.module.scss';
import { Input } from './Input';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createComment } from '@/utils/api/mutations';
import { QueryKeys } from '@/types/enums';

type Props = {
  taskId: string;
};

export const CommentInput = (props: Props) => {
  const { taskId } = props;

  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors },
  } = useForm<CreateCommentFormValues>({
    resolver: zodResolver(createCommentSchema),
  });

  const queryClient = useQueryClient();

  const { mutate: createCommentMutation } = useMutation({
    mutationFn: (values: CreateCommentFormValues) => {
      if (!taskId) {
        throw new Error('Task ID is required');
      }

      return createComment({
        ...values,
        taskId: +taskId,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [`${QueryKeys.COMMENTS}_${taskId}`],
      });

      await queryClient.invalidateQueries({
        queryKey: [`${QueryKeys.ACTIONS}_${taskId}`],
      });
    },
    onError: (error) => {
      setError('root', { message: error.message });
    },
  });

  const onSubmit: SubmitHandler<CreateCommentFormValues> = (data) => {
    createCommentMutation(data);
  };

  return (
    <form className={styles.commentInputWrapper} onSubmit={handleSubmit(onSubmit)}>
      <Input multiline className={styles.commentInput} placeholder="Add comment..." {...register('comment')} />

      {errors.comment && <p className={styles.validationText}>{errors.comment.message}</p>}

      {errors.root && <p className={styles.validationText}>{errors.root.message}</p>}

      <div className={styles.buttonWrapper}>
        <Button text="Publish" bgColor="orange" textColor="white" width="12.75rem" />
      </div>
    </form>
  );
};
