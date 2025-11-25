import { CheckCheck, CircleAlert } from "lucide-react";

export const FormSuccess = ({ message }: { message: string }) => (
  <p className="inline-flex w-full items-start gap-2 rounded-md border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-left text-sm text-emerald-500">
    <CheckCheck className="mt-0.5 size-4 shrink-0" />
    {message}
  </p>
);

export const FormError = ({ message }: { message: string }) => (
  <p className="border-destructive/20 bg-destructive/10 text-destructive inline-flex w-full items-start gap-2 rounded-md border px-4 py-3 text-left text-sm">
    <CircleAlert className="mt-0.5 size-4 shrink-0" />
    {message}
  </p>
);
