"use client";

import { useMutation, useQuery } from "convex/react"
import {api} from "@workspace/backend/_generated/api"
import { Button } from "@workspace/ui/components/button";

export default function Page() {

  const users=useQuery(api.user.getMany)
  const add =useMutation(api.user.add);
  return (
    <div className="flex  items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Hello World</h1>
        <Button onClick={()=>add()}>Add</Button>
        {
          JSON.stringify(users)
        }
       
      </div>
    </div>
  )
}
