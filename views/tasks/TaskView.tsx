'use client';

import { useQuery } from '@tanstack/react-query';

import { Button } from '@/components/common/Button';
import { Column } from '@/components/common/Column';
import { Comment } from '@/components/common/Comment';
import { CommentInput } from '@/components/common/CommentInput';
import { Details } from '@/components/common/Details';
import { Loader } from '@/components/common/Loader';
import { Check } from '@/components/svg/Check';
import { Freeze } from '@/components/svg/Freeze';
import { Participant } from '@/components/svg/Participant';
import { QueryKeys } from '@/types/enums';
import { getActionsByTaskId, getTaskById } from '@/utils/api/queries';
import { mapActionsToColumns, mapTaskToDetails } from '@/utils/helpers';

import styles from './TaskView.module.scss';

type Props = {
  taskId: string;
};

export const TaskPage = (props: Props) => {
  const { taskId } = props;

  const { data, isLoading, isError } = useQuery({
    queryKey: [`${QueryKeys.TASK}_${taskId}`],
    queryFn: () => getTaskById(+taskId),
  });

  const { data: actions, isLoading: isLoadingActions } = useQuery({
    queryKey: [`${QueryKeys.ACTIONS}_${taskId}`],
    queryFn: () => getActionsByTaskId(+taskId),
  });

  if (isLoading || !data || isError) {
    return <Loader />;
  }

  return (
    <div>
      <h1>{data.title}</h1>

      <div className={styles.contentWrapper}>
        <Column title="Actions" columns={mapActionsToColumns(actions)} isLoading={isLoadingActions} />

        <div className={styles.commentSection}>
          <Details details={data.description} />

          <CommentInput />

          <Comment />
        </div>

        <div className={styles.taskDetailsSection}>
          <Details details={mapTaskToDetails(data)} />

          <Button text="Change the priority" isModalButton width="100%" isFontBold={false} />

          <Button text="Change the task type" isModalButton width="100%" isFontBold={false} />

          <Button text="Become a participant" bgColor="green" textColor="white" width="100%" icon={<Participant />} />

          <Button text="Freeze the task" bgColor="blue" textColor="black" width="100%" icon={<Freeze />} />

          <Button text="Close task" bgColor="red" textColor="white" width="100%" icon={<Check />} />
        </div>
      </div>
    </div>
  );
};
