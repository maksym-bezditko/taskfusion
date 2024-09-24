'use client';

import { Loader } from '@/components/common/Loader';
import { useMyProfile } from '@/hooks/useUserProfile';
import { UserType } from '@/types/enums';
import { ClientDashboardView } from '@/views/dashboard/ClientDashboardView';
import { DeveloperDashboardView } from '@/views/dashboard/DeveloperDashboardView';
import { PmDashboardView } from '@/views/dashboard/PmDashboardView';

export default function Page() {
  const { data, error, isLoading } = useMyProfile();

  const renderDashboard = () => {
    switch (data?.userType) {
      case UserType.CLIENT:
        return <ClientDashboardView />;
      case UserType.DEVELOPER:
        return <DeveloperDashboardView />;
      case UserType.PM:
        return <PmDashboardView />;
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
