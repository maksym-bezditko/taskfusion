import { TaskPage } from '@/views/tasks/TaskView';

export default function Page(props: { params: { taskId: string; projectId: string } }) {
  const { taskId } = props.params;

  return <TaskPage taskId={taskId} />;
}
