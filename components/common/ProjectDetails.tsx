import { useQuery } from '@tanstack/react-query';
import moment from 'moment';

import { QueryKeys, TaskStatus } from '@/types/enums';
import { getProjectById, getProjectDeveloperUsers, getProjectPmUser, getTasksByStatus } from '@/utils/api/queries';

import { Details } from './Details';
import { Loader } from './Loader';
import styles from './ProjectDetails.module.scss';

type Props = {
  projectId: string;
};

export const ProjectDetails = (props: Props) => {
  const { projectId } = props;

  const { data, isLoading, isError } = useQuery({
    queryKey: [QueryKeys.PROJECT + projectId],
    queryFn: () => getProjectById(projectId),
  });

  const { data: projectPmUser, isLoading: isLoadingProjectPm } = useQuery({
    queryKey: [QueryKeys.PROJECT_PM_USER + projectId],
    queryFn: () => getProjectPmUser(+projectId),
    retry: false,
  });

  const { data: projectDeveloperUsers, isLoading: isLoadingProjectDeveloperUsers } = useQuery({
    queryKey: [QueryKeys.PROJECT_DEVELOPER_USERS + projectId],
    queryFn: () => getProjectDeveloperUsers(+projectId),
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

  if (
    isLoading ||
    isError ||
    !data ||
    isLoadingProjectPm ||
    isLoadingTodo ||
    isLoadingProgress ||
    isLoadingClosed ||
    isLoadingFrozen ||
    isLoadingProjectDeveloperUsers
  ) {
    return <Loader isSmall />;
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
      value: projectDeveloperUsers?.map((user) => user.name).join(', ') || 'No participants',
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
    <div className={styles.detailsWrapper}>
      <Details details={DETAILS} />

      <Details details={DETAIL_STRING} />

      <Details details={TASK_DETAILS} />
    </div>
  );
};
