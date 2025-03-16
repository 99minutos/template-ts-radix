import { LoaderCircleIcon } from 'lucide-react';

export function LoadingPage() {
  return (
    <div className="flex flex-col items-center justify-center content-center w-full h-screen">
      <img src="/logo.svg" alt="Permissions" className="w-auto h-16" />
      <LoaderCircleIcon className="animate-spin text-primary" size={48} />
    </div>
  );
}
