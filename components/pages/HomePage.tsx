import styles from "./HomePage.module.scss";

import { Details } from "../global/Details/Details";
import { Status } from "../global/Status/Status";
import { ListView } from "../global/ListView/ListView";
import { TextWithIcon } from "../global/TextWithIcon/TextWithIcon";
import { Props as ListItemProps } from "../global/ListItem/ListItem";
import { Download } from "../svg/Download";
import { Upload } from "../svg/Upload";

const DETAILS = [
  {
    title: "Address",
    value: "12/04/2021",
  },
  {
    title: "Date added",
    value: "12/04/2021",
  },
  {
    title: "Contacts",
    value: "+996545423",
  },
  {
    title: "Phone",
    value: <Status status="Closed" />,
  },
];

const DETAIL_STRING =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis risus, sed arcu rhoncus suspendisse. Cursus nibh nam varius morbi mauris nulla urna. Nulla elit mattis semper eget venenatis, vitae. ";

const PROJECTS: ListItemProps[] = [
  {
    title: "ОсОО “Energi.kg”",
    data: [
      <TextWithIcon key={1} iconName="sunrise" text="12/04/2021" />,
      <TextWithIcon key={2} iconName="sunset" text="12/04/2021" />,
      <TextWithIcon key={3} iconName="people" text="Adyl, Azhar, Arthur" />,
    ],
  },
  {
    title: "TextLab",
    data: [
      <TextWithIcon key={1} iconName="sunrise" text="12/04/2021" />,
      <TextWithIcon key={2} iconName="sunset" text="12/04/2021" />,
      <TextWithIcon key={3} iconName="people" text="Adyl, Azhar, Arthur" />,
    ],
  },
  {
    title: "ComLab",
    data: [
      <TextWithIcon key={1} iconName="sunrise" text="12/04/2021" />,
      <TextWithIcon key={2} iconName="sunset" text="12/04/2021" />,
      <TextWithIcon key={3} iconName="people" text="Adyl, Azhar, Arthur" />,
    ],
  },
];

const PAYMENTS: ListItemProps[] = [
  {
    title: "August Invoice",
    data: [
      <TextWithIcon key={1} iconName="sunrise" text="12/04/2021" />,
      <TextWithIcon key={2} iconName="sunset" text="12/04/2021" />,
      <p key={3} className="g_price">
        $ 100
      </p>,
    ],
  },
  {
    title: "July Invoice",
    data: [
      <TextWithIcon key={1} iconName="sunrise" text="12/04/2021" />,
      <TextWithIcon key={2} iconName="sunset" text="12/04/2021" />,
      <p key={3} className="g_price">
        $ 798
      </p>,
    ],
  },
  {
    title: "June Invoice",
    data: [
      <TextWithIcon key={1} iconName="sunrise" text="12/04/2021" />,
      <TextWithIcon key={2} iconName="sunset" text="12/04/2021" />,
      <p key={3} className="g_price">
        c 7890
      </p>,
    ],
  },
];

const TASKS: ListItemProps[] = [
  {
    title: "Action Navigation",
    data: [<TextWithIcon key={1} iconName="sunset" text="12/04/2021" />],
    type: "row",
  },
  {
    title: "Notifications",
    data: [<TextWithIcon key={1} iconName="sunset" text="12/04/2021" />],
    type: "row",
  },
  {
    title: "Notifications",
    data: [<TextWithIcon key={1} iconName="sunset" text="12/04/2021" />],
    type: "row",
  },
];

const DOCUMENTS: ListItemProps[] = [
  {
    title: "Document_9",
    data: [<TextWithIcon key={1} iconName="upload" text="12/04/2021" />],
    type: "row",
    right: <Download />,
  },
  {
    title: "Invoice_3",
    data: [<TextWithIcon key={1} iconName="upload" text="12/04/2021" />],
    type: "row",
    right: <Download />,
  },
  {
    title: "Assignment_1",
    data: [<TextWithIcon key={1} iconName="upload" text="12/04/2021" />],
    type: "row",
    right: <Download />,
  },
];

export const HomePage = () => {
  return (
    <div>
      <h1>ОсОО “Energi.kg”</h1>

      <div className={styles.contentWrapper}>
        <div className={styles.detailsWrapper}>
          <Details details={DETAILS} isTwoColumns />

          <Details details={DETAIL_STRING} />
        </div>

        <div className={styles.listItemsWrapper}>
          <ListView
            title="Projects"
            rightElement={
              <TextWithIcon iconName="export" text="Export" isClickable />
            }
            listItems={PROJECTS}
          />

          <ListView title="Tasks" listItems={TASKS} />

          <ListView title="Payments" listItems={PAYMENTS} />

          <ListView
            title="Documents"
            rightElement={
              <Upload />
            }
            listItems={DOCUMENTS}
          />
        </div>
      </div>
    </div>
  );
};
