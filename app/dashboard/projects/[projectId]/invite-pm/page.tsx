import { InvitePmView } from '@/views/projects/InvitePmView';

export default async function Page(props: { params: { projectId: string } }) {
  const { projectId } = props.params;

  return <InvitePmView projectId={projectId} />;
}
