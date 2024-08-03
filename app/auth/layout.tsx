import React from 'react';

import { FormLayout } from '@/layouts/FormLayout';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <FormLayout>{children}</FormLayout>;
};

export default Layout;
