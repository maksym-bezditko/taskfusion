import "@/styles/normalize.scss";
import "@/styles/globals.scss";

import { MainLayout } from "@/components/layouts/MainLayout/MainLayout";
import type { Metadata } from "next";
import { Rubik } from "next/font/google";

const inter = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Taskfusion",
  description: "Manage your tasks with ease.",
};

const Layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
};

export default Layout;
