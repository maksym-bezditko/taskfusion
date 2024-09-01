'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useMemo } from 'react';
import { BiPlus } from 'react-icons/bi';

import { Button } from '@/components/common/Button';
import { Column } from '@/components/common/Column';
import { Loader } from '@/components/common/Loader';
import { ProjectDetails } from '@/components/common/ProjectDetails';
import TaskSidebar from '@/components/common/TaskSidebar';
import { Plus } from '@/components/svg/Plus';
import useTaskSidebar from '@/store/useTaskSidebar';
import { QueryKeys, TaskStatus, UserType } from '@/types/enums';
import { getProjectById, getProjectPmUser, getTasksByStatus, getUserProfile } from '@/utils/api/queries';
import { mapTasksToColumns } from '@/utils/helpers';

import styles from './ProjectView.module.scss';

type Props = {
  projectId: string;
};

export const ProjectView = (props: Props) => {
  const { projectId } = props;

  const { setType } = useTaskSidebar();

  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: [QueryKeys.USER_PROFILE],
    queryFn: getUserProfile,
  });

  const {
    data: project,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [QueryKeys.PROJECT + projectId],
    queryFn: () => getProjectById(projectId),
  });

  const { data: projectPmUser, isLoading: isLoadingProjectPm } = useQuery({
    queryKey: [QueryKeys.PROJECT_PM_USER + projectId],
    queryFn: () => getProjectPmUser(+projectId),
    retry: false,
  });

  const { data: todoTasks, isLoading: isLoadingTodo } = useQuery({
    queryKey: [`${QueryKeys.PROJECTS}_${projectId}_${QueryKeys.TASKS}_${TaskStatus.TO_DO}`],
    queryFn: () => getTasksByStatus(+projectId, TaskStatus.TO_DO),
  });

  const { data: progressTasks, isLoading: isLoadingProgress } = useQuery({
    queryKey: [`${QueryKeys.PROJECTS}_${projectId}_${QueryKeys.TASKS}_${TaskStatus.IN_PROGRESS}`],
    queryFn: () => getTasksByStatus(+projectId, TaskStatus.IN_PROGRESS),
  });

  const { data: closedTasks, isLoading: isLoadingClosed } = useQuery({
    queryKey: [`${QueryKeys.PROJECTS}_${projectId}_${QueryKeys.TASKS}_${TaskStatus.CLOSED}`],
    queryFn: () => getTasksByStatus(+projectId, TaskStatus.CLOSED),
  });

  const { data: frozenTasks, isLoading: isLoadingFrozen } = useQuery({
    queryKey: [`${QueryKeys.PROJECTS}_${projectId}_${QueryKeys.TASKS}_${TaskStatus.FROZEN}`],
    queryFn: () => getTasksByStatus(+projectId, TaskStatus.FROZEN),
  });

  const { todoTasksColumn, progressTasksColumn, frozenTasksColumn, closedTasksColumn } = useMemo(() => {
    return {
      todoTasksColumn: mapTasksToColumns(todoTasks),
      progressTasksColumn: mapTasksToColumns(progressTasks),
      frozenTasksColumn: mapTasksToColumns(frozenTasks),
      closedTasksColumn: mapTasksToColumns(closedTasks),
    };
  }, [todoTasks, progressTasks, closedTasks, frozenTasks]);

  if (
    isLoading ||
    isError ||
    !project ||
    isLoadingProjectPm ||
    isLoadingTodo ||
    isLoadingProgress ||
    isLoadingClosed ||
    isLoadingFrozen ||
    isLoadingProfile
  ) {
    return <Loader />;
  }

  return (
    <div>
      <div className={styles.titleWrapper}>
        <h1>{project.title}</h1>

        {!projectPmUser && profile?.userType === UserType.CLIENT && (
          <Link href={`/projects/${projectId}/invite-pm`}>
            <Button text="Invite PM" bgColor="orange" textColor="white" icon={<BiPlus />} />
          </Link>
        )}

        {profile?.userType === UserType.PM && (
          <Link href={`/projects/${projectId}/invite-developer`}>
            <Button text="Invite Developer" bgColor="orange" textColor="white" icon={<BiPlus />} />
          </Link>
        )}
      </div>

      <div className="contentWrapper">
        <ProjectDetails projectId={projectId} />

        <div className={styles.wrapper}>
          <Column
            title={TaskStatus.TO_DO}
            projectId={+projectId}
            columns={todoTasksColumn}
            right={
              <Plus
                onClick={() => {
                  setType(TaskStatus.TO_DO);
                }}
              />
            }
            isDraggable
          />

          <Column
            title={TaskStatus.IN_PROGRESS}
            projectId={+projectId}
            columns={progressTasksColumn}
            right={
              <Plus
                onClick={() => {
                  setType(TaskStatus.IN_PROGRESS);
                }}
              />
            }
            isDraggable
          />

          <Column
            title={TaskStatus.CLOSED}
            projectId={+projectId}
            columns={closedTasksColumn}
            right={
              <Plus
                onClick={() => {
                  setType(TaskStatus.CLOSED);
                }}
              />
            }
            isDraggable
          />

          <Column
            title={TaskStatus.FROZEN}
            projectId={+projectId}
            columns={frozenTasksColumn}
            right={
              <Plus
                onClick={() => {
                  setType(TaskStatus.FROZEN);
                }}
              />
            }
            isDraggable
          />
        </div>
      </div>

      <TaskSidebar projectId={+projectId} />
    </div>
  );
};
