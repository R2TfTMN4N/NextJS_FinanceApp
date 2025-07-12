"use client";
import { Button } from "@/components/ui/button";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  const { onOpen } = useNewAccount();
  const { isLoaded, isSignedIn, user } = useUser();

  // Show loading while Clerk is initializing
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  // Show sign-in prompt if not authenticated
  if (!isSignedIn) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Please sign in to continue</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Welcome, {user?.firstName}!</h1>
      </div>
      <Button onClick={onOpen}>Add Account</Button>
    </div>
  );
}
