import { Sunset } from "@/components/svg/Sunset";
import styles from "./TextWithIcon.module.scss";
import { Sunrise } from "@/components/svg/Sunrise";
import { People } from "@/components/svg/People";
import { Export } from "@/components/svg/Export";
import classNames from "classnames";
import { UploadCircle } from "@/components/svg/UploadCircle";

type Props = {
  iconName: "sunset" | "sunrise" | "people" | "export" | "upload";
  text: string;
  isClickable?: boolean;
};

const mapNameToIcon = (name: Props["iconName"]) => {
  switch (name) {
    case "sunset":
      return <Sunset />;

    case "sunrise":
      return <Sunrise />;

    case "people":
      return <People />;

    case "export":
      return <Export />;

    case "upload":
      return <UploadCircle />;
  }
};

export const TextWithIcon = (props: Props) => {
  const { iconName, text, isClickable } = props;

  return (
    <div
      className={classNames(isClickable && styles.clickable, styles.wrapper)}
    >
      {mapNameToIcon(iconName)}

      <p className={styles.text}>{text}</p>
    </div>
  );
};
