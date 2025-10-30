import RootLayout from '@/shared/components/layout/root-layout';
import React from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <RootLayout>
      <div className="flex h-screen items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-sm space-y-4 rounded-lg bg-white px-4 py-8 shadow-md">{children}</div>
      </div>
    </RootLayout>
  );
};

export default AuthLayout;
