import { create } from 'zustand';

import { TaskStatus } from '@/types/enums';

export type TaskSidebarType = TaskStatus | null;

type TaskSidebarStore = {
  type: TaskSidebarType;
  setType: (type: TaskSidebarType) => void;
};

const useTaskSidebar = create<TaskSidebarStore>((set) => ({
  type: null,
  setType: (type) => set({ type }),
}));

export default useTaskSidebar;
