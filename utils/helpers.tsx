import moment from 'moment';

import { Avatar } from '@/components/common/Avatar';
import { Props as ColumnItemProps } from '@/components/common/ColumnItem';
import { Detail } from '@/components/common/Details';
import { PriorityBadge } from '@/components/common/PriorityBadge';
import { Action, Task } from '@/types';

export const mapTasksToColumns = (tasks: Task[] = []): ColumnItemProps[] => {
  return tasks.map((task) => ({
    id: task.id,
    title: task.title,
    rows: [
      {
        name: 'Participants',
        value: task.users.length ? task.users.map((user) => user.name).join(', ') : 'No participants',
      },
      {
        name: 'Date added',
        value: moment(task.createdAt).format('MM/DD/YYYY, h:mm a'),
      },
    ],
    priority: task.taskPriority,
    href: `/projects/${task.projectId}/task/${task.id}`,
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
      value: moment(task.createdAt).format('MM/DD/YYYY, h:mm a'),
    },
    {
      title: 'Deadline',
      value: moment(task.deadline).format('MM/DD/YYYY, h:mm a'),
    },
    {
      title: 'Participants',
      value: task.users.length ? task.users.map((user) => user.name).join(', ') : 'No participants',
    },
  ];
};

export const mapActionsToColumns = (actions?: Action[]): ColumnItemProps[] => {
  return (
    actions?.map((action) => ({
      id: action.id,
      title: action.title,
      rows: [
        {
          name: 'Date added',
          value: moment(action.createdAt).format('MM/DD/YYYY, h:mm a'),
        },
      ],
      author: <Avatar name={action.user.name} />,
    })) || []
  );
};
