'use client';

import { useMutation } from '@tanstack/react-query';
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
import { useTaskActions } from '@/hooks/useTaskActions';
import { useTaskById } from '@/hooks/useTaskById';
import { useTaskComments } from '@/hooks/useTaskComments';
import { useMyProfile } from '@/hooks/useUserProfile';
import { QueryKeys, TaskStatus } from '@/types/enums';
import { assignTaskToUser, changeTaskStatus, unassignTaskFromUser } from '@/utils/api/mutations';
import { mapActionsToColumns, mapTaskToDetails } from '@/utils/helpers';
import { queryClient } from '@/utils/queryClient';

import styles from './tasks.module.scss';

type Props = {
  taskId: string;
  projectId: string;
};

export const TaskPage = (props: Props) => {
  const { taskId, projectId } = props;

  const { data: profile } = useMyProfile();
  const { data: task, isLoading: isTaskLoading, isError } = useTaskById(taskId);
  const { data: actions, isLoading: isLoadingActions } = useTaskActions(taskId);
  const { data: comments, isLoading: isCommentsLoading } = useTaskComments(taskId);

  const invalidateTask = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: [`${QueryKeys.PROJECTS}_${projectId}_${QueryKeys.TASKS}`],
    });

    queryClient.invalidateQueries({
      queryKey: [`${QueryKeys.TASK}_${taskId}`],
    });

    queryClient.invalidateQueries({
      queryKey: [`${QueryKeys.ACTIONS}_${taskId}`],
    });
  }, [projectId, taskId]);

  const { mutateAsync: mutateTaskStatusAsync } = useMutation({
    mutationFn: changeTaskStatus,
    onSuccess: invalidateTask,
  });

  const { mutateAsync: mutateAssignTaskAsync } = useMutation({
    mutationFn: assignTaskToUser,
    onSuccess: invalidateTask,
  });

  const { mutateAsync: mutateUnassignTaskAsync } = useMutation({
    mutationFn: unassignTaskFromUser,
    onSuccess: invalidateTask,
  });

  const amIParticipant = task?.users.some((user) => user.id === profile?.id);

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

  const handleFreezeTask = () => {
    mutateTaskStatusAsync({
      taskId: +taskId,
      taskStatus: TaskStatus.FROZEN,
    });
  };

  const handleBecomeParticipant = () => {
    if (!profile) {
      return;
    }

    mutateAssignTaskAsync({
      taskId: +taskId,
      userId: profile.id,
    });
  };

  const handleLeaveTask = () => {
    if (!profile) {
      return;
    }

    mutateUnassignTaskAsync({
      taskId: +taskId,
      userId: profile.id,
    });
  };

  const handleCloseTask = () => {
    mutateTaskStatusAsync({
      taskId: +taskId,
      taskStatus: TaskStatus.CLOSED,
    });
  };

  if (isTaskLoading || !task || isError) {
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

          {!amIParticipant && !isTaskLoading && (
            <Button
              text="Become a participant"
              bgColor="green"
              textColor="white"
              width="100%"
              icon={<Participant />}
              onClick={handleBecomeParticipant}
            />
          )}

          {amIParticipant && !isTaskLoading && (
            <Button
              text="Leave the task"
              bgColor="gray"
              textColor="black"
              width="100%"
              icon={<Participant color="black" />}
              onClick={handleLeaveTask}
            />
          )}
        </div>
      </div>
    </div>
  );
};
