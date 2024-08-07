import { ProjectView } from '@/views/projects/ProjectView';

export default async function Page(props: { params: { id: string } }) {
  const { id } = props.params;

  return <ProjectView projectId={id} />;
}
