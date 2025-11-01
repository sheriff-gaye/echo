"use client"

import { SignUp } from "@clerk/nextjs";

export const SignedUpView = () => {
  return <SignUp routing="hash" />;
};
