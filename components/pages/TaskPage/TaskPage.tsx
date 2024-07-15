import { Column } from "@/components/global/Column/Column";
import styles from "./TaskPage.module.scss";
import { Props as ColumnItemProps } from "@/components/global/ColumnItem/ColumnItem";
import { Avatar } from "@/components/global/Avatar/Avatar";
import { Details } from "@/components/global/Details/Details";
import { PriorityBadge } from "@/components/global/PriorityBadge/PriorityBadge";

type Props = {
  taskId: string;
};

const ACTIONS: ColumnItemProps[] = [
  {
    title: "CRM system design",
    rows: [
      {
        name: "Participant",
        value: "Azhar",
      },
      {
        name: "Date added",
        value: "12/04/2021",
      },
    ],
    status: "Medium",
    text: "Приступил(а) к выполнению",
    author: <Avatar name="Adyl" />,
  },
  {
    title: "Statistics",
    rows: [
      {
        name: "Participant",
        value: "Azhar",
      },
      {
        name: "Date added",
        value: "12/04/2021",
      },
    ],
    status: "Low",
    text: "Приступил(а) к выполнению",
    author: <Avatar name="Adyl" />,
  },
  {
    title: "Priorities",
    rows: [
      {
        name: "Participant",
        value: "Adyl, Azhar",
      },
      {
        name: "Date added",
        value: "12/04/2021",
      },
    ],
    status: "High",
    text: "Создал(а) задачу",
    author: <Avatar name="Adyl" />,
  },
];

const DETAILS_STRING =
  "Добавить статистику по задачам, часам. Сделать сбор статистики за текущий месяц и создание уведомления в последний день месяца.";

const TASK_DETAILS = [
  {
    title: "Priority",
    value: <PriorityBadge priority="Low" />,
  },
  {
    title: "Status",
    value: "Frozen",
  },
  {
    title: "Date added",
    value: "12/04/2021",
  },
  {
    title: "Deadline",
    value: "21/04/2021",
  },
  {
    title: "Participants",
    value: "Adyl, Azhar, Arthur",
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
        </div>

        <div className={styles.taskDetailsSection}>
          <Details details={TASK_DETAILS} />
        </div>
      </div>
    </div>
  );
};
