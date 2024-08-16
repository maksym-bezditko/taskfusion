'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { Button } from '@/components/common/Button';
import { Column } from '@/components/common/Column';
import { Comment } from '@/components/common/Comment';
import { CommentInput } from '@/components/common/CommentInput';
import { Details } from '@/components/common/Details';
import { Loader } from '@/components/common/Loader';
import { NoData } from '@/components/common/NoData';
import { Check } from '@/components/svg/Check';
import { Freeze } from '@/components/svg/Freeze';
import { Participant } from '@/components/svg/Participant';
import { QueryKeys, TaskStatus } from '@/types/enums';
import { changeTaskStatus } from '@/utils/api/mutations';
import { getActionsByTaskId, getCommentsByTaskId, getTaskById } from '@/utils/api/queries';
import { mapActionsToColumns, mapTaskToDetails } from '@/utils/helpers';
import { queryClient } from '@/utils/queryClient';

import styles from './TaskView.module.scss';

type Props = {
  taskId: string;
  projectId: string;
};

export const TaskPage = (props: Props) => {
  const { taskId, projectId } = props;

  const {
    data: task,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [`${QueryKeys.TASK}_${taskId}`],
    queryFn: () => getTaskById(+taskId),
  });

  const router = useRouter();

  const { data: actions, isLoading: isLoadingActions } = useQuery({
    queryKey: [`${QueryKeys.ACTIONS}_${taskId}`],
    queryFn: () => getActionsByTaskId(+taskId),
  });

  const { data: comments, isLoading: isCommentsLoading } = useQuery({
    queryKey: [`${QueryKeys.COMMENTS}_${taskId}`],
    queryFn: () => getCommentsByTaskId(+taskId),
  });

  const { mutateAsync } = useMutation({
    mutationFn: changeTaskStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`${QueryKeys.PROJECTS}_${projectId}_${QueryKeys.TASKS}`],
      });
    },
  });

  const commentsContent = useCallback(() => {
    if (isCommentsLoading) {
      return <Loader isSmall />;
    }

    if (!comments?.length) {
      return <NoData />;
    }

    return comments.map((comment) => (
      <Comment key={comment.id} name={comment.user.name} text={comment.text} date={comment.createdAt} />
    ));
  }, [comments, isCommentsLoading]);

  const handleFreezeTask = async () => {
    await mutateAsync({
      taskId: +taskId,
      taskStatus: TaskStatus.FROZEN,
    });

    router.push(`/dashboard/projects/${projectId}`);
  };

  const handleCloseTask = async () => {
    await mutateAsync({
      taskId: +taskId,
      taskStatus: TaskStatus.CLOSED,
    });

    router.push(`/dashboard/projects/${projectId}`);
  };

  if (isLoading || !task || isError) {
    return <Loader />;
  }

  return (
    <div>
      <h1>{task.title}</h1>

      <div className={styles.contentWrapper}>
        <Column
          title="Actions"
          columns={mapActionsToColumns(actions)}
          isLoading={isLoadingActions}
          projectId={+projectId}
        />

        <div className={styles.commentSection}>
          <Details details={task.description} />

          <CommentInput taskId={taskId} />

          {commentsContent()}
        </div>

        <div className={styles.taskDetailsSection}>
          <Details details={mapTaskToDetails(task)} />

          <Button text="Change the priority" isModalButton width="100%" isFontBold={false} />

          <Button text="Change the task type" isModalButton width="100%" isFontBold={false} />

          <Button text="Become a participant" bgColor="green" textColor="white" width="100%" icon={<Participant />} />

          {task.taskStatus !== TaskStatus.FROZEN && (
            <Button
              text="Freeze the task"
              bgColor="blue"
              textColor="black"
              width="100%"
              icon={<Freeze />}
              onClick={handleFreezeTask}
            />
          )}

          {task.taskStatus !== TaskStatus.CLOSED && (
            <Button
              text="Close task"
              bgColor="red"
              textColor="white"
              width="100%"
              icon={<Check />}
              onClick={handleCloseTask}
            />
          )}
        </div>
      </div>
    </div>
  );
};
