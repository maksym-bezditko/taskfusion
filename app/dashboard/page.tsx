'use client';

import useSWR from 'swr';

import { UserType } from '@/types';
import { getUserProfile } from '@/utils/api/queries';
import { ClientDashboardView } from '@/views/dashboards/ClientDashboardView';
import { DeveloperDashboardView } from '@/views/dashboards/DeveloperDashboardView';
import { PmDashboardView } from '@/views/dashboards/PmDashboardView';

export default function Page() {
  const { data, error, isLoading } = useSWR(getUserProfile.queryKey, getUserProfile.fetcher);

  if (isLoading) {
    return 'loading';
  }

  if (error || !data) {
    return 'error';
  }

  if (data.userType === UserType.CLIENT) {
    return <ClientDashboardView profile={data} />;
  }

  if (data.userType === UserType.DEVELOPER) {
    return <DeveloperDashboardView profile={data} />;
  }

  return <PmDashboardView profile={data} />;
}
