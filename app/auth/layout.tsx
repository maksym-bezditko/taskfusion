import { AuthLayout } from "@/components/layouts/AuthLayout/AuthLayout";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <AuthLayout>{children}</AuthLayout>;
};

export default Layout;