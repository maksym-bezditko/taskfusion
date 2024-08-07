'use client';

import { useQuery } from '@tanstack/react-query';

import { Loader } from '@/components/common/Loader';
import { QueryKeys, UserType } from '@/types/enums';
import { getUserProfile } from '@/utils/api/queries';
import { ClientDashboardView } from '@/views/dashboards/ClientDashboardView';
import { DeveloperDashboardView } from '@/views/dashboards/DeveloperDashboardView';
import { PmDashboardView } from '@/views/dashboards/PmDashboardView';

export default function Page() {
  const { data, error, isLoading } = useQuery({ queryKey: [QueryKeys.USER_PROFILE], queryFn: getUserProfile });

  if (isLoading) {
    return <Loader />;
  }

  if (error || !data) {
    return 'error';
  }

  if (data.userType === UserType.CLIENT) {
    return <ClientDashboardView />;
  }

  if (data.userType === UserType.DEVELOPER) {
    return <DeveloperDashboardView profile={data} />;
  }

  return <PmDashboardView profile={data} />;
}
