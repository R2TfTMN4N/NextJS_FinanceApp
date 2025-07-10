import { SignUp, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
export default function Page() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="h-full lg:flex flex-col items-center justify-center px-4">
        <div className=" text-center space-y-4 pt-16">
          <h1 className="font-bold text-3xl ">Welcome Back</h1>
          <p className="text-base text-[#7E8CA0]">
            Log in or Create Account to get back to your dashboard
          </p>
        </div>
        <div className="flex items-center justify-center mt-8">
          
            <SignUp />
          
          {/* <ClerkLoading>
            <Loader2 className="animate-spin text-muted-foreground"></Loader2>
          </ClerkLoading> */}
        </div>
      </div>
      <div className="h-full bg-blue-500 hidden lg:flex items-center justify-center">
        <h1>FINANCE</h1>
      </div>
    </div>
  );
}
