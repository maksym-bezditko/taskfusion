import moment from 'moment';

import { Avatar } from '@/components/common/Avatar';
import { Props as ColumnItemProps } from '@/components/common/ColumnItem';
import { Detail } from '@/components/common/Details';
import { PriorityBadge } from '@/components/common/PriorityBadge';
import { Action, Task } from '@/types';

export const mapTasksToColumns = (tasks: Task[] = []): ColumnItemProps[] => {
  return tasks.map((task) => ({
    title: task.title,
    rows: [
      {
        name: 'Participant',
        value: 'Azhar',
      },
      {
        name: 'Date added',
        value: moment(task.createdAt).format('DD/MM/YYYY'),
      },
    ],
    priority: task.taskPriority,
    href: `/dashboard/projects/${task.projectId}/task/${task.id}`,
  }));
};

export const mapTaskToDetails = (task: Task): Detail[] => {
  return [
    {
      title: 'Priority',
      value: <PriorityBadge priority={task.taskPriority} />,
    },
    {
      title: 'Status',
      value: task.taskStatus,
    },
    {
      title: 'Date added',
      value: moment(task.createdAt).format('DD/MM/YYYY'),
    },
    {
      title: 'Deadline',
      value: moment(task.deadline).format('DD/MM/YYYY'),
    },
    {
      title: 'Participants',
      value: 'Azhar, Bilal',
    },
  ];
};

export const mapActionsToColumns = (actions?: Action[]): ColumnItemProps[] => {
  return (
    actions?.map((action) => ({
      title: action.title,
      rows: [
        {
          name: 'Date added',
          value: moment(action.createdAt).format('DD/MM/YYYY'),
        },
      ],
      author: <Avatar name={action.user.name} />,
    })) || []
  );
};
