"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import type { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type FormInputProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = {
  form: UseFormReturn<TFieldValues>;
  name: TName;
  label: string;
  defaultValue?: string;
  placeholder?: string;
  type?: string;
  withToggle?: boolean;
};

export const FormInput = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  form,
  name,
  label,
  placeholder,
  type = "text",
  withToggle = false,
}: FormInputProps<TFieldValues, TName>) => {
  const [show, setShow] = useState(false);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>

          <FormControl>
            <div className="relative">
              <Input
                {...field}
                aria-invalid={form.formState.errors[name] ? "true" : "false"}
                className="w-full"
                placeholder={placeholder}
                type={withToggle ? (show ? "text" : "password") : type}
              />

              {withToggle && (
                <button
                  className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 text-xs"
                  type="button"
                  onClick={() => setShow(!show)}
                >
                  {show ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              )}
            </div>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};
