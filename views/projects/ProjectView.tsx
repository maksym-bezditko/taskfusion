'use client';

import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import Link from 'next/link';
import { useMemo } from 'react';
import { BiPlus } from 'react-icons/bi';

import { Button } from '@/components/common/Button';
import { Column } from '@/components/common/Column';
import { Details } from '@/components/common/Details';
import { Loader } from '@/components/common/Loader';
import TaskSidebar from '@/components/common/TaskSidebar';
import { Plus } from '@/components/svg/Plus';
import useTaskSidebar from '@/store/useTaskSidebar';
import { QueryKeys, TaskStatus } from '@/types/enums';
import { getProjectById, getProjectPmUser, getTasksByStatus } from '@/utils/api/queries';
import { mapTasksToColumns } from '@/utils/helpers';

import styles from './ProjectView.module.scss';

type Props = {
  projectId: string;
};

export const ProjectView = (props: Props) => {
  const { projectId } = props;

  const { setType } = useTaskSidebar();

  const { data, isLoading, isError } = useQuery({
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
    !data ||
    isLoadingProjectPm ||
    isLoadingTodo ||
    isLoadingProgress ||
    isLoadingClosed ||
    isLoadingFrozen
  ) {
    return <Loader />;
  }

  const DETAILS = [
    {
      title: 'Date added',
      value: moment(data.createdAt).format('MM/DD/YYYY, h:mm a'),
    },
    {
      title: 'Deadline',
      value: moment(data.deadline).format('MM/DD/YYYY, h:mm a'),
    },
    {
      title: 'Participants',
      value: 'No participants',
    },
    {
      title: 'PM',
      value: projectPmUser?.name || 'No PM',
    },
  ];

  const DETAIL_STRING = data.description;

  const TASK_DETAILS = [
    {
      title: 'To do',
      value: todoTasks?.length || 0,
    },
    {
      title: 'In progress',
      value: progressTasks?.length || 0,
    },
    {
      title: 'Closed',
      value: closedTasks?.length || 0,
    },
    {
      title: 'Frozen',
      value: frozenTasks?.length || 0,
    },
  ];

  return (
    <div>
      <div className={styles.titleWrapper}>
        <h1>{data.title}</h1>

        {!projectPmUser && (
          <Link href={`/dashboard/projects/${projectId}/invite-pm`}>
            <Button text="Invite PM" bgColor="orange" textColor="white" icon={<BiPlus />} />
          </Link>
        )}
      </div>

      <div className="contentWrapper">
        <div className={styles.detailsWrapper}>
          <Details details={DETAILS} />

          <Details details={DETAIL_STRING} />

          <Details details={TASK_DETAILS} />
        </div>

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
