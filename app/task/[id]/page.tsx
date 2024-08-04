import { TaskPage } from '@/views/tasks/TaskView';

export default function Page(props: { params: { id: string } }) {
  const { id } = props.params;

  return <TaskPage taskId={id} />;
}
