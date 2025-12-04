import { WidgetHeader } from "../components/widget-header";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";
import { useMutation } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { Doc } from "@workspace/backend/_generated/dataModel";

const formSchema = z.object({
  name: z.string().min(1, "name is require"),
  email: z.string().email("invalid email address")
});

export const WidegtAuthScreen = () => {
  const organizationId = "1234";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: ""
    }
  });

  const createContactSession = useMutation(api.public.contactSession.create);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!organizationId) return;

    const metadata: Doc<"contactSession">["metadata"] = {
      userAgent: navigator.userAgent,
      language: navigator.language,
      languages: navigator.languages?.join(","),
      platform: navigator.platform,
      vendor: navigator.vendor,
      screenResoultion: `${screen.width} x ${screen.height}`,
      viewPortSize: `${window.innerWidth}x ${window.innerHeight}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timezoneOffset: new Date().getTimezoneOffset(),
      cookieEnabled: navigator.cookieEnabled,
      referrer: document.referrer || "direct"
    };

    const contactSessionId = await createContactSession({
      ...values,
      metadata,
      organizationId
    });

    console.log(contactSessionId);
  };
  return (
    <>
      <WidgetHeader>
        <div className="flex flex-col justify-between gap-y-2  px-2  py-6 font-semibold">
          <p className="text-3xl">Hi There </p>
          <p className="text-lg ">Let's Get You Started</p>
        </div>
      </WidgetHeader>
      <Form {...form}>
        <form
          className="flex flex-col  flex-1 gap-y-4  p-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="h-10 bg-background"
                    placeholder="Sheriff Gaye"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="h-10 bg-background"
                    placeholder="echo@gmail.com"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={form.formState.isSubmitting}
            size="lg"
            type="submit"
          >
            Comntinue
          </Button>
        </form>
      </Form>
    </>
  );
};
