import classNames from 'classnames';

import { Export } from '@/components/svg/Export';
import { People } from '@/components/svg/People';
import { Sunrise } from '@/components/svg/Sunrise';
import { Sunset } from '@/components/svg/Sunset';
import { UploadCircle } from '@/components/svg/UploadCircle';

import styles from './TextWithIcon.module.scss';

type Props = {
  iconName: 'sunset' | 'sunrise' | 'people' | 'export' | 'upload';
  text: string;
  isClickable?: boolean;
};

const mapNameToIcon = (name: Props['iconName']) => {
  switch (name) {
    case 'sunset':
      return <Sunset />;

    case 'sunrise':
      return <Sunrise />;

    case 'people':
      return <People />;

    case 'export':
      return <Export />;

    case 'upload':
      return <UploadCircle />;
  }
};

export const TextWithIcon = (props: Props) => {
  const { iconName, text, isClickable } = props;

  return (
    <div className={classNames(isClickable && styles.clickable, styles.wrapper)}>
      {mapNameToIcon(iconName)}

      <p className={styles.text}>{text}</p>
    </div>
  );
};
