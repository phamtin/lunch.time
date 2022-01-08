import React, { memo } from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="app-container">{children}</div>;
};

export default memo(AuthLayout);
