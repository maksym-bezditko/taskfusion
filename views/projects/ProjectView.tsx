'use client';

import { useQuery } from '@tanstack/react-query';
import moment from 'moment';

import { Column } from '@/components/common/Column';
// import { Props as ColumnItemProps } from '@/components/common/ColumnItem';
import { Details } from '@/components/common/Details';
import { Loader } from '@/components/common/Loader';
import { Plus } from '@/components/svg/Plus';
import { QueryKeys } from '@/types/enums';
import { getProjectById } from '@/utils/api/queries';

import styles from './ProjectView.module.scss';

type Props = {
  projectId: string;
};

// const TODO_COLUMNS: ColumnItemProps[] = [
//   {
//     title: 'CRM system design',
//     rows: [
//       {
//         name: 'Participant',
//         value: 'Azhar',
//       },
//       {
//         name: 'Date added',
//         value: '12/04/2021',
//       },
//     ],
//     status: 'Medium',
//   },
//   {
//     title: 'Statistics',
//     rows: [
//       {
//         name: 'Participant',
//         value: 'Azhar',
//       },
//       {
//         name: 'Date added',
//         value: '12/04/2021',
//       },
//     ],
//     status: 'Low',
//   },
//   {
//     title: 'Priorities',
//     rows: [
//       {
//         name: 'Participant',
//         value: 'Adyl, Azhar',
//       },
//       {
//         name: 'Date added',
//         value: '12/04/2021',
//       },
//     ],
//     status: 'High',
//   },
// ];

// const PROGRESS_COLUMNS: ColumnItemProps[] = [
//   {
//     title: 'Notifications',
//     rows: [
//       {
//         name: 'Participant',
//         value: 'Artur',
//       },
//       {
//         name: 'Date added',
//         value: '12/04/2021',
//       },
//     ],
//     status: 'Low',
//   },
//   {
//     title: 'Task types',
//     rows: [
//       {
//         name: 'Participant',
//         value: 'Adyl',
//       },
//       {
//         name: 'Date added',
//         value: '12/04/2021',
//       },
//     ],
//     status: 'Low',
//   },
// ];

// const FROZEN_COLUMNS: ColumnItemProps[] = [
//   {
//     title: 'Todoshnik',
//     rows: [
//       {
//         name: 'Participant',
//         value: 'Azhar',
//       },
//       {
//         name: 'Date added',
//         value: '12/04/2021',
//       },
//     ],
//     status: 'Low',
//   },
// ];

export const ProjectView = (props: Props) => {
  const { projectId } = props;

  const { data, isLoading, isError } = useQuery({
    queryKey: [QueryKeys.PROJECT + projectId],
    queryFn: () => getProjectById(projectId),
  });

  if (isLoading || isError || !data) {
    return <Loader />;
  }

  const DETAILS = [
    {
      title: 'Date added',
      value: moment(data.createdAt).format('DD/MM/YYYY'),
    },
    {
      title: 'Deadline',
      value: moment(data.deadline).format('DD/MM/YYYY'),
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
          <Column title="To do" columns={[]} right={<Plus />} />

          <Column title="In progress" columns={[]} right={<Plus />} />

          <Column title="Closed" columns={[]} right={<Plus />} />

          <Column title="Frozen" columns={[]} right={<Plus />} />
        </div>
      </div>
    </div>
  );
};
