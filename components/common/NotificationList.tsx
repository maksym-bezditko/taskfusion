import { Notification } from '@/types';

import styles from './NotificationList.module.scss';
import NotificationListItem from './NotificationListItem';

type NotificationListProps = {
  notifications: Notification[];
  setIsOpen: (value: boolean) => void;
};

export const NotificationList = ({ notifications, setIsOpen }: NotificationListProps) => {
  if (!notifications.length) {
    return <p>No notifications</p>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.titleWrapper}>
        <h2 className={styles.title}>Notifications</h2>

        <button className={styles.closeButton} onClick={() => setIsOpen(false)}>
          ×
        </button>
      </div>

      <div className={styles.listItems}>
        {notifications.map((notification) => (
          <NotificationListItem key={notification.id} notification={notification} setIsOpen={setIsOpen} />
        ))}
      </div>
    </div>
  );
};
