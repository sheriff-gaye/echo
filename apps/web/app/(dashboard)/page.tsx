"use client";


import { Unauthenticated, Authenticated } from "convex/react";
import { OrganizationSwitcher, SignInButton, UserButton } from "@clerk/nextjs";

export default function Page() {
 
  return (
    <>
      <Authenticated>
        <div className="flex  items-center justify-center min-h-svh">
          <div className="flex flex-col items-center justify-center gap-4">
            <UserButton />
            <OrganizationSwitcher hidePersonal />
            <h1 className="text-2xl font-bold">Hello World</h1>
           
          </div>
        </div>
      </Authenticated>

      <Unauthenticated>
        <p>user must logged in </p>
        <SignInButton />
      </Unauthenticated>
    </>
  );
}
