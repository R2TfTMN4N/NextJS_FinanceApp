import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="animate-spin size-8 text-blue-600" />
        <p className="text-slate-600">Loading authentication...</p>
      </div>
    </div>
  );
}
