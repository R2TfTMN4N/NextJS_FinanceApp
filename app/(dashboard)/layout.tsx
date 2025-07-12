"use client";
import Header from '@/components/ui/header';
import React from 'react';
import { useUser } from '@clerk/nextjs';

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  const { isLoaded, isSignedIn } = useUser();

  // Wait for Clerk to load
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading authentication...</div>
      </div>
    );
  }

  // Redirect to sign-in if not authenticated
  if (!isSignedIn) {
    window.location.href = '/sign-in';
    return null;
  }

  return (
    <>
      <Header />
      <main className="px-3 lg:px-12">{children}</main>
    </>
  );
};

export default DashboardLayout;
