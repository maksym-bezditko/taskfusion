'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';

import useTaskSidebar from '@/store/useTaskSidebar';
import { TaskPriority, TaskStatus } from '@/types/enums';

import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Select } from '../common/Select';

import styles from './TaskSidebar.module.scss';

const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  taskPriority: z.nativeEnum(TaskPriority),
  taskStatus: z.nativeEnum(TaskStatus),
  deadline: z.string().min(1, 'Deadline is required'),
  projectId: z.number().min(1, 'Project ID is required'),
  developerId: z.number().min(1, 'Developer ID is required'),
});

type TaskFormValues = z.infer<typeof taskSchema>;

const TaskSidebar = () => {
  const { type, setType } = useTaskSidebar();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
  });

  const onSubmit: SubmitHandler<TaskFormValues> = (data) => {
    console.log('Form Data:', data);
  };

  useEffect(() => {
    if (!type) {
      return;
    }

    setValue('taskStatus', type);
  }, [setValue, type]);

  return (
    <div className={`${styles.sidebar} ${type ? styles.active : ''}`}>
      <div className={styles.wrapper}>
        <div className={styles.titleWrapper}>
          <h2 className={styles.title}>Create Task</h2>
          <button className={styles.closeButton} onClick={() => setType(null)}>
            ×
          </button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <Input placeholder="Title" {...register('title')} />
          {errors.title && <p className={styles.validationText}>{errors.title.message}</p>}

          <Input placeholder="Description" multiline {...register('description')} />
          {errors.description && <p className={styles.validationText}>{errors.description.message}</p>}

          <Select
            placeholder="Priority"
            options={Object.values(TaskPriority).map((priority) => ({ value: priority, label: priority }))}
            {...register('taskPriority')}
          />
          {errors.taskPriority && <p className={styles.validationText}>{errors.taskPriority.message}</p>}

          <Select
            placeholder="Status"
            options={Object.values(TaskStatus).map((status) => ({ value: status, label: status }))}
            {...register('taskStatus')}
          />
          {errors.taskStatus && <p className={styles.validationText}>{errors.taskStatus.message}</p>}

          <Input type="date" placeholder="Deadline" {...register('deadline')} />
          {errors.deadline && <p className={styles.validationText}>{errors.deadline.message}</p>}

          <div className={styles.buttonWrapper}>
            <Button text="Create Task" bgColor="orange" isFontBold textColor="white" width="12.75rem" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskSidebar;
