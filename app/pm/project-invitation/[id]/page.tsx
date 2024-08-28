import { ProjectInvitationView } from '@/views/invites/ProjectInvitationView';

export default function Page(props: { params: { id: string } }) {
  return <ProjectInvitationView inviteId={props.params.id} />;
}
