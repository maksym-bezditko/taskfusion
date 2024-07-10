import styles from "./HomePage.module.scss";

import { Details } from "../global/Details/Details";
import { Status } from "../global/Status/Status";
import { ListView } from "../global/ListView/ListView";
import { TextWithIcon } from "../global/TextWithIcon/TextWithIcon";
import { Props as ListItemProps } from "../global/ListItem/ListItem";

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
    columns: [
      <TextWithIcon key={1} iconName="sunrise" text="12/04/2021" />,
      <TextWithIcon key={2} iconName="sunset" text="12/04/2021" />,
      <TextWithIcon key={3} iconName="people" text="Adyl, Azhar, Arthur" />,
    ],
  },
  {
    title: "TextLab",
    columns: [
      <TextWithIcon key={1} iconName="sunrise" text="12/04/2021" />,
      <TextWithIcon key={2} iconName="sunset" text="12/04/2021" />,
      <TextWithIcon key={3} iconName="people" text="Adyl, Azhar, Arthur" />,
    ],
  },
  {
    title: "ComLab",
    columns: [
      <TextWithIcon key={1} iconName="sunrise" text="12/04/2021" />,
      <TextWithIcon key={2} iconName="sunset" text="12/04/2021" />,
      <TextWithIcon key={3} iconName="people" text="Adyl, Azhar, Arthur" />,
    ],
  },
];

const PAYMENTS: ListItemProps[] = [
  {
    title: "August Invoice",
    columns: [
      <TextWithIcon key={1} iconName="sunrise" text="12/04/2021" />,
      <TextWithIcon key={2} iconName="sunset" text="12/04/2021" />,
      <p key={3} className="g_price">
        $ 100
      </p>,
    ],
  },
  {
    title: "July Invoice",
    columns: [
      <TextWithIcon key={1} iconName="sunrise" text="12/04/2021" />,
      <TextWithIcon key={2} iconName="sunset" text="12/04/2021" />,
      <p key={3} className="g_price">
        $ 798
      </p>,
    ],
  },
  {
    title: "June Invoice",
    columns: [
      <TextWithIcon key={1} iconName="sunrise" text="12/04/2021" />,
      <TextWithIcon key={2} iconName="sunset" text="12/04/2021" />,
      <p key={3} className="g_price">
        c 7890
      </p>,
    ],
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

        <ListView
          title="Projects"
          rightElement={
            <TextWithIcon iconName="export" text="Export" isClickable />
          }
          listItems={PROJECTS}
        />

        <ListView title="Payments" listItems={PAYMENTS} />
      </div>
    </div>
  );
};
