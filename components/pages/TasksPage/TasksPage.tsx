import styles from "./TasksPage.module.scss";

import { Column } from "@/components/global/Column/Column";
import { Props as ColumnItemProps } from "@/components/global/ColumnItem/ColumnItem";
import { Details } from "@/components/global/Details/Details";
import { ProjectStatus } from "@/components/global/ProjectStatus/ProjectStatus";
import { Plus } from "@/components/svg/Plus";

const TODO_COLUMNS: ColumnItemProps[] = [
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
  },
];

const PROGRESS_COLUMNS: ColumnItemProps[] = [
  {
    title: "Notifications",
    rows: [
      {
        name: "Participant",
        value: "Artur",
      },
      {
        name: "Date added",
        value: "12/04/2021",
      },
    ],
    status: "Low",
  },
  {
    title: "Task types",
    rows: [
      {
        name: "Participant",
        value: "Adyl",
      },
      {
        name: "Date added",
        value: "12/04/2021",
      },
    ],
    status: "Low",
  },
];

const FROZEN_COLUMNS: ColumnItemProps[] = [
  {
    title: "Todoshnik",
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
  },
];

const DETAILS = [
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

const DETAIL_STRING = "Менеджер для внутреннего пользования, предназначенный для учета статистики и трекинга задач.";

const TASK_DETAILS = [
  {
    title: "All tasks",
    value: "6",
  },
  {
    title: "Done",
    value: "0",
  },
  {
    title: "Frozen",
    value: "1",
  },
];

export const TasksPage = () => {
  return (
    <div>
      <h1>Project name</h1>

      <div className={styles.contentWrapper}>
        <div className={styles.detailsWrapper}>
          <Details details={DETAILS} />

          <Details details={DETAIL_STRING} />

          <Details details={TASK_DETAILS} />
        </div>

        <div className={styles.wrapper}>
          <Column title="To do" columns={TODO_COLUMNS} right={<Plus />} />

          <Column
            title="In progress"
            columns={PROGRESS_COLUMNS}
            right={<Plus />}
          />

          <Column title="Closed" columns={[]} right={<Plus />} />

          <Column title="Frozen" columns={FROZEN_COLUMNS} right={<Plus />} />
        </div>
      </div>
    </div>
  );
};
