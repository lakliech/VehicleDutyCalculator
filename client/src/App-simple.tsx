import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";

function SimpleApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-purple-800 mb-4">
            Gariyangu - Kenya Motor Vehicle Platform
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Vehicle duty calculator and marketplace loading...
          </p>
          <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default SimpleApp;