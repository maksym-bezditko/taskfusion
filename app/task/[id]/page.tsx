import { TaskPage } from '@/views/TaskView';

export default function Page(props: { params: { id: string } }) {
  const { id } = props.params;

  return <TaskPage taskId={id} />;
}
