import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import AuthLayout from "../layouts/auth-layout";
import { SignedInView } from "../views/signed-in-view";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  return;
  <>
    <AuthLoading>
      <AuthLayout>
        <p>loading...</p>
      </AuthLayout>
    </AuthLoading>
    <Unauthenticated>
      <AuthLayout>
        <SignedInView />
      </AuthLayout>
    </Unauthenticated>
  </>;
};
