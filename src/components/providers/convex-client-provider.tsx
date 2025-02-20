"use client";

import { ReactNode } from "react";
import {
  ConvexReactClient,
  AuthLoading,
  Authenticated,
  Unauthenticated,
} from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ClerkProvider, useAuth, SignIn } from "@clerk/nextjs";
import { Loader } from "lucide-react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!;

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider publishableKey={publishableKey}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <AuthLoading>
          <div className="min-h-screen flex items-center justify-center p-3">
            <Loader className="size-5 animate-spin" />
          </div>
        </AuthLoading>
        <Unauthenticated>
          <div className="min-h-screen flex items-center justify-center p-3">
            <SignIn routing="hash" />
          </div>
        </Unauthenticated>
        <Authenticated>{children}</Authenticated>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
