'use client';

import { ErrorView } from '@/views/ErrorView';

export default function Error({ error }: { error: Error & { digest?: string }; reset: () => void }) {
  return <ErrorView error={error} />;
}
