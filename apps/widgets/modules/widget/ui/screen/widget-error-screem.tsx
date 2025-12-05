"use client";
import { useAtomValue } from "jotai";
import { AlertTriangleIcon } from "lucide-react";
import { errorMessageAtom } from "../../atoms/widget-atom";
import { WidgetHeader } from "../components/widget-header";

export const WidgetErrorMessage = () => {
  const errorMessage = useAtomValue(errorMessageAtom);
  return (
    <>
      <WidgetHeader>
        <div className="flex flex-col justify-between gap-y-2  px-2  py-6 font-semibold">
          <p className="text-3xl">Hi There </p>
          <p className="text-lg ">Let's Get You Started</p>
        </div>
      </WidgetHeader>

      <div className="flex flex-1 flex-col items-center justify-center gap-y-4 p-4 text-muted-foreground">
        <AlertTriangleIcon className="" />
        <p className="text-sm">{errorMessage || "Invalid Configuration"}</p>
      </div>
    </>
  );
};
