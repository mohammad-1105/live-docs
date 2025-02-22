"use client"; // Required since this is a Client Component

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button"; // Assuming a UI library like shadcn/ui
import { AlertCircle } from "lucide-react"; // Optional: Icon for visual flair

interface ErrorProps {
  error: Error & { digest?: string }; // Next.js adds a digest property for debugging
  reset: () => void; // Function to retry the render
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service (e.g., Sentry)
    console.error("Error caught in error.tsx:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="max-w-md w-full mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-center">
        {/* Error Icon */}
        <AlertCircle className="mx-auto h-16 w-16 text-red-500 mb-4" />

        {/* Error Message */}
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Something Went Wrong!
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {error.message ||
            "An unexpected error occurred. We're sorry for the inconvenience."}
        </p>

        {/* Optional Debug Info */}
        {error.digest && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Error ID: {error.digest}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <Button
            onClick={() => reset()}
            variant="default"
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Try Again
          </Button>
          <Link href="/">
            <Button
              variant="outline"
              className="text-gray-700 dark:text-gray-300"
            >
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
