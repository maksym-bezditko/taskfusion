import styles from "./HomePage.module.scss";

import { Details } from "../global/Details/Details";
import { Status } from "../global/Status/Status";

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

export const HomePage = () => {
  return (
    <div>
      <h1>ОсОО “Energi.kg”</h1>

      <div className={styles.detailsWrapper}>
        <Details details={DETAILS} isTwoColumns />

        <Details details={DETAIL_STRING} />
      </div>
    </div>
  );
};
