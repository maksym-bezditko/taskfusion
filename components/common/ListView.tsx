import { ReactNode } from 'react';

import { ListItem, Props as ListItemProps } from '@/components/common/ListItem';

import styles from './ListView.module.scss';

type Props = {
  title: string;
  listItems: ListItemProps[];
  rightElement?: ReactNode;
};

export const ListView = (props: Props) => {
  const { title, listItems, rightElement } = props;

  return (
    <div className={styles.wrapper}>
      <div className={styles.titleWrapper}>
        <p className={styles.title}>{title}</p>

        {rightElement}
      </div>

      <div className={styles.listItems}>
        {listItems.map((listItem) => (
          <ListItem key={listItem.title} {...listItem} />
        ))}
      </div>
    </div>
  );
};