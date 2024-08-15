'use client';

import { useMutation } from '@tanstack/react-query';
import classNames from 'classnames';
import React, { ReactNode } from 'react';

import { ColumnItem, Props as ColumnItemProps } from '@/components/common/ColumnItem';
import { QueryKeys, TaskStatus } from '@/types/enums';
import { changeTaskStatus } from '@/utils/api/mutations';
import { queryClient } from '@/utils/queryClient';

import styles from './Column.module.scss';
import { Loader } from './Loader';
import { NoData } from './NoData';

type Props = {
  title: string;
  projectId: number;
  columns?: ColumnItemProps[];
  right?: ReactNode;
  isLoading?: boolean;
  isDraggable?: boolean;
};

export const Column = (props: Props) => {
  const { title, projectId, columns, right, isLoading, isDraggable } = props;

  const { mutateAsync } = useMutation({
    mutationFn: changeTaskStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`${QueryKeys.PROJECTS}_${projectId}_${QueryKeys.TASKS}`],
      });
    },
  });

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const taskId = event.dataTransfer.getData('taskId');

    await mutateAsync({
      taskId: +taskId,
      taskStatus: title as TaskStatus,
    });

    queryClient.invalidateQueries({
      predicate: (query) => {
        const [key] = query.queryKey as [string];

        return (
          key.startsWith(`${QueryKeys.PROJECTS}_${projectId}_${QueryKeys.TASKS}`) ||
          key === `${QueryKeys.ACTIONS}_${taskId}`
        );
      },
    });
  };

  const contentItems = () => {
    if (isLoading) {
      return <Loader isSmall />;
    }

    if (!columns?.length) {
      return <NoData />;
    }

    return (
      <div className={styles.contentWrapper}>
        {columns.map((column) => (
          <ColumnItem key={column.id} {...column} isDraggable={isDraggable} />
        ))}
      </div>
    );
  };

  return (
    <div className={classNames(styles.wrapper)} onDragOver={handleDragOver} onDrop={handleDrop}>
      <div className={styles.headerWrapper}>
        <p className={styles.title}>{title}</p>
        {right}
      </div>

      {contentItems()}
    </div>
  );
};
