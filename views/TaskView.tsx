import { Avatar } from '@/components/common/Avatar';
import { Button } from '@/components/common/Button';
import { Column } from '@/components/common/Column';
import { Props as ColumnItemProps } from '@/components/common/ColumnItem';
import { Comment } from '@/components/common/Comment';
import { CommentInput } from '@/components/common/CommentInput';
import { Details } from '@/components/common/Details';
import { PriorityBadge } from '@/components/common/PriorityBadge';
import { Check } from '@/components/svg/Check';
import { Freeze } from '@/components/svg/Freeze';
import { Participant } from '@/components/svg/Participant';

import styles from './TaskView.module.scss';

type Props = {
  taskId: string;
};

const ACTIONS: ColumnItemProps[] = [
  {
    title: 'CRM system design',
    rows: [
      {
        name: 'Participant',
        value: 'Azhar',
      },
      {
        name: 'Date added',
        value: '12/04/2021',
      },
    ],
    text: 'Приступил(а) к выполнению',
    author: <Avatar name="Adyl" />,
  },
  {
    title: 'Statistics',
    rows: [
      {
        name: 'Participant',
        value: 'Azhar',
      },
      {
        name: 'Date added',
        value: '12/04/2021',
      },
    ],
    text: 'Приступил(а) к выполнению',
    author: <Avatar name="Adyl" />,
  },
  {
    title: 'Priorities',
    rows: [
      {
        name: 'Participant',
        value: 'Adyl, Azhar',
      },
      {
        name: 'Date added',
        value: '12/04/2021',
      },
    ],
    text: 'Создал(а) задачу',
    author: <Avatar name="Adyl" />,
  },
];

const DETAILS_STRING =
  'Добавить статистику по задачам, часам. Сделать сбор статистики за текущий месяц и создание уведомления в последний день месяца.';

const TASK_DETAILS = [
  {
    title: 'Priority',
    value: <PriorityBadge priority="Low" />,
  },
  {
    title: 'Status',
    value: 'Frozen',
  },
  {
    title: 'Date added',
    value: '12/04/2021',
  },
  {
    title: 'Deadline',
    value: '21/04/2021',
  },
  {
    title: 'Participants',
    value: 'Adyl, Azhar, Arthur',
  },
];

export const TaskPage = (props: Props) => {
  const { taskId } = props;

  return (
    <div>
      <h1>TaskPage {taskId}</h1>

      <div className={styles.contentWrapper}>
        <Column title="Actions" columns={ACTIONS} />

        <div className={styles.commentSection}>
          <Details details={DETAILS_STRING} />

          <CommentInput />

          <Comment />
        </div>

        <div className={styles.taskDetailsSection}>
          <Details details={TASK_DETAILS} />

          <Button text="Change the priority" isModalButton width="100%" isFontBold={false} />

          <Button text="Change the task type" isModalButton width="100%" isFontBold={false} />

          <Button text="Become a participant" bgColor="green" textColor="white" width="100%" icon={<Participant />} />

          <Button text="Freeze the task" bgColor="blue" textColor="black" width="100%" icon={<Freeze />} />

          <Button text="Close task" bgColor="red" textColor="white" width="100%" icon={<Check />} />
        </div>
      </div>
    </div>
  );
};
