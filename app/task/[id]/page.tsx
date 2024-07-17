import { TaskPage } from "@/components/pages/TaskPage/TaskPage";

export default function Page(props: { params: { id: string } }) {
  const { id } = props.params;

  return <TaskPage taskId={id} />;
}
