import { Loader2 } from "lucide-react";

interface SinglePropertyLoadingFallbackProps {}

export function SinglePropertyLoadingFallback({}: SinglePropertyLoadingFallbackProps) {
  return <div className="w-full h-full flex flex-col items-center justify-center">
    <h1 className="text-2xl font-bold">Loading...</h1>
    <p className="text-gray-500">Please wait while we fetch the data.</p>
    <Loader2 className="h-6 w-6 animate-spin mt-4" />
  </div>;
}

export function SinglePropertyNotFound() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">Page Not Found</h1>
      <p className="text-gray-500">The page you are looking for does not exist.</p>
    </div>
  );
}
