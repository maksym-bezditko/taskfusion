'use client';

import { useQuery } from '@tanstack/react-query';

import { Loader } from '@/components/common/Loader';
import { QueryKeys, UserType } from '@/types/enums';
import { getUserProfile } from '@/utils/api/queries';
import { ClientDashboardView } from '@/views/dashboards/ClientDashboardView';
import { DeveloperDashboardView } from '@/views/dashboards/DeveloperDashboardView';
import { PmDashboardView } from '@/views/dashboards/PmDashboardView';

export default function Page() {
  const { data, error, isLoading } = useQuery({
    queryKey: [QueryKeys.USER_PROFILE],
    queryFn: getUserProfile,
  });

  const renderDashboard = () => {
    switch (data?.userType) {
      case UserType.CLIENT:
        return <ClientDashboardView profile={data} />;
      case UserType.DEVELOPER:
        return <DeveloperDashboardView profile={data} />;
      case UserType.PM:
        return <PmDashboardView profile={data} />;
      default:
        return 'error';
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error || !data) {
    return 'error';
  }

  return renderDashboard();
}
