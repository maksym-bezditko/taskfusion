'use client';

import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import { useMemo } from 'react';

import { Column } from '@/components/common/Column';
import { Details } from '@/components/common/Details';
import { Loader } from '@/components/common/Loader';
import TaskSidebar from '@/components/common/TaskSidebar';
import { Plus } from '@/components/svg/Plus';
import useTaskSidebar from '@/store/useTaskSidebar';
import { QueryKeys, TaskStatus } from '@/types/enums';
import { getProjectById, getTasksByStatus } from '@/utils/api/queries';
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

  const { data: todoTasks } = useQuery({
    queryKey: [`${QueryKeys.PROJECTS}_${projectId}_${QueryKeys.TASKS}_${TaskStatus.TO_DO}`],
    queryFn: () => getTasksByStatus(+projectId, TaskStatus.TO_DO),
  });

  const { data: progressTasks } = useQuery({
    queryKey: [`${QueryKeys.PROJECTS}_${projectId}_${QueryKeys.TASKS}_${TaskStatus.IN_PROGRESS}`],
    queryFn: () => getTasksByStatus(+projectId, TaskStatus.IN_PROGRESS),
  });

  const { data: closedTasks } = useQuery({
    queryKey: [`${QueryKeys.PROJECTS}_${projectId}_${QueryKeys.TASKS}_${TaskStatus.CLOSED}`],
    queryFn: () => getTasksByStatus(+projectId, TaskStatus.CLOSED),
  });

  const { data: frozenTasks } = useQuery({
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

  if (isLoading || isError || !data) {
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
      value: 'Adyl, Azhar, Arthur',
    },
  ];

  const DETAIL_STRING = data.description;

  const TASK_DETAILS = [
    {
      title: 'All tasks',
      value: '0',
    },
    {
      title: 'Done',
      value: '0',
    },
    {
      title: 'Frozen',
      value: '0',
    },
  ];

  return (
    <div>
      <h1>{data.title}</h1>

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
          />
        </div>
      </div>

      <TaskSidebar projectId={+projectId} />
    </div>
  );
};
