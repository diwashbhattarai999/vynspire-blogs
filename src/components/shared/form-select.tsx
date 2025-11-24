'use client';

import type { FieldPath, FieldValues, UseFormReturn } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

type FormSelectProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = {
  form: UseFormReturn<TFieldValues>;
  name: TName;
  label: string;
  placeholder?: string;
  options: Array<{ value: string; label: string; icon?: React.ReactNode }>;
};

export const FormSelect = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  form,
  name,
  label,
  placeholder,
  options = [],
}: FormSelectProps<TFieldValues, TName>) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem className='gap-4'>
        <FormLabel className='text-base font-medium'>{label}</FormLabel>
        <Select defaultValue={field.value} onValueChange={field.onChange}>
          <FormControl>
            <SelectTrigger className='w-full sm:w-[240px]'>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {options.map(option => (
              <SelectItem key={option.value} value={option.value}>
                <div className='flex items-center gap-2'>
                  {option.icon && <>{option.icon}</>}
                  <span>{option.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    )}
  />
);
