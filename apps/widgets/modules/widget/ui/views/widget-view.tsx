"use client";

import { useAtomValue } from "jotai";
import { WidgetFooter } from "../components/widget-footer";
import { WidegtAuthScreen } from "../screen/widget-auth-screen";
import { screenAtom } from "../../atoms/widget-atom";
import { WidgetErrorMessage } from "../screen/widget-error-screem";
import { WidgetLoadingScreen } from "../screen/widget-loading-screen";

interface Props {
  organizationId: string;
}

export const WidgetView = ({ organizationId }: Props) => {
  const screen = useAtomValue(screenAtom);

  const screenComponents = {
    error: <WidgetErrorMessage />,
    loading: <WidgetLoadingScreen organizationId={organizationId}/>,
    selection: <p>selection</p>,
    auth: <WidegtAuthScreen />,
    voice: <p>voice</p>,
    inbox: <p>inbox</p>,
    chat: <p>chat</p>,
    contact: <p>contact</p>
  };
  return (
    <main className=" min-h-screen min-w-screen flex h-full w-full flex-col overflow-hidden rounded-xl border  bg-muted">
      {screenComponents[screen]}
      <WidgetFooter />
    </main>
  );
};
