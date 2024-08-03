import { notFound } from 'next/navigation';

import { UserType } from '@/types';
import { api } from '@/utils/api';
import { ClientDashboardView } from '@/views/dashboards/ClientDashboardView';
import { DeveloperDashboardView } from '@/views/dashboards/DeveloperDashboardView';
import { PmDashboardView } from '@/views/dashboards/PmDashboardView';

export default async function Page() {
  const user = await api.getUserProfile();

  if (!user) {
    notFound();
  }

  if (user.data.userType === UserType.CLIENT) {
    return <ClientDashboardView profile={user.data} />;
  }

  if (user.data.userType === UserType.DEVELOPER) {
    return <DeveloperDashboardView profile={user.data} />;
  }

  return <PmDashboardView profile={user.data} />;
}
