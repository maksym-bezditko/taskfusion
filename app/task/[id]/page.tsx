import { TaskPage } from '@/pages/TaskPage';

export default function Page(props: { params: { id: string } }) {
  const { id } = props.params;

  return <TaskPage taskId={id} />;
}
