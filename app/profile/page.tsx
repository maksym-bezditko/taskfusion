'use client';

import { Loader } from '@/components/common/Loader';
import { useMyProfile } from '@/hooks/useUserProfile';
import { UserType } from '@/types/enums';
import { ClientProfileView } from '@/views/profiles/ClientProfileView';
import { DeveloperProfileView } from '@/views/profiles/DeveloperProfileView';
import { PmProfileView } from '@/views/profiles/PmProfileView';

export default function Page() {
  const { data, error, isLoading } = useMyProfile();

  const renderProfile = () => {
    switch (data?.userType) {
      case UserType.CLIENT:
        return <ClientProfileView profile={data} />;
      case UserType.DEVELOPER:
        return <DeveloperProfileView profile={data} />;
      case UserType.PM:
        return <PmProfileView profile={data} />;
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

  return renderProfile();
}
