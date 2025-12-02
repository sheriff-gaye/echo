"use client"
import {  Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import AuthLayout from "../layouts/auth-layout";
import { SignedUpView } from "../views/signed-up-view";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  return(
  <>
    <AuthLoading>
      <AuthLayout>
        <p>loading...</p>
      </AuthLayout>
    </AuthLoading>
    <Authenticated>
      {children}
    </Authenticated>
    <Unauthenticated>
      <AuthLayout>
        <SignedUpView />
      </AuthLayout>
    </Unauthenticated> 
  </>);
};
