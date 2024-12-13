import React from "react";

import AppHeader, { type AppHeaderProps } from "./app-header";

type DashboardLayoutProps = {
  children: React.ReactNode;
  appHeaderProps: AppHeaderProps;
};

const DashboardLayout = ({
  children,
  appHeaderProps,
}: DashboardLayoutProps) => {
  return (
    <>
      <AppHeader {...appHeaderProps} />
      {children}
    </>
  );
};

export default DashboardLayout;
