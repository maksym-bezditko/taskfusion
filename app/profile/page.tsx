'use client';

import { useQuery } from '@tanstack/react-query';

import { Loader } from '@/components/common/Loader';
import { QueryKeys, UserType } from '@/types/enums';
import { getUserProfile } from '@/utils/api/queries';
import { ClientProfileView } from '@/views/profile/ClientProfileView';
import { DeveloperProfileView } from '@/views/profile/DeveloperProfileView';
import { PmProfileView } from '@/views/profile/PmProfileView';

export default function Page() {
  const { data, error, isLoading } = useQuery({
    queryKey: [QueryKeys.USER_PROFILE],
    queryFn: getUserProfile,
  });

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
