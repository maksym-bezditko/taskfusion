import Image from "next/image";
import styles from "./Avatar.module.scss";
import DefaultAvatarImage from "@/components/assets/DefaultAvatar.png";

type Props = {
  name: string;
  image?: string;
};

export const Avatar = (props: Props) => {
  const { name, image = DefaultAvatarImage.src } = props;

  return (
    <div className={styles.avatarWrapper}>
      <Image src={image} alt={name} width={40} height={40} />

			<p className={styles.name}>{name}</p>
    </div>
  );
};