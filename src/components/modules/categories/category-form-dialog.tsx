"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { IconEdit, IconPlus } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  type Category,
  type CreateCategoryData,
  createCategory,
  type UpdateCategoryData,
  updateCategory,
} from "@/lib/api/posts";

const categorySchema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name is too long"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(50, "Slug is too long")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug must be lowercase letters, numbers, and hyphens only",
    ),
  color: z.string().min(1, "Color is required"),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

interface CategoryFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: Category | null;
}

const colorOptions = [
  { value: "bg-pink-500", label: "Pink" },
  { value: "bg-teal-500", label: "Teal" },
  { value: "bg-blue-500", label: "Blue" },
  { value: "bg-purple-500", label: "Purple" },
  { value: "bg-green-500", label: "Green" },
  { value: "bg-yellow-500", label: "Yellow" },
  { value: "bg-red-500", label: "Red" },
  { value: "bg-orange-500", label: "Orange" },
  { value: "bg-indigo-500", label: "Indigo" },
  { value: "bg-gray-500", label: "Gray" },
];

export function CategoryFormDialog({
  open,
  onOpenChange,
  category,
}: CategoryFormDialogProps) {
  const queryClient = useQueryClient();
  const isEdit = !!category;

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      slug: "",
      color: "",
    },
  });

  useEffect(() => {
    if (category && open) {
      form.reset({
        name: category.name,
        slug: category.slug,
        color: category.color,
      });
    } else if (!category && open) {
      form.reset({
        name: "",
        slug: "",
        color: "",
      });
    }
  }, [category, open, form]);

  const createMutation = useMutation({
    mutationFn: (data: CreateCategoryData) => createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      handleClose();
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: UpdateCategoryData) =>
      updateCategory(category?.id ?? "", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      handleClose();
    },
  });

  const onSubmit = (data: CategoryFormValues) => {
    if (isEdit) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  const handleClose = () => {
    form.reset();
    onOpenChange(false);
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isEdit ? (
              <>
                <IconEdit className="size-5" />
                Edit Category
              </>
            ) : (
              <>
                <IconPlus className="size-5" />
                Create Category
              </>
            )}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update the category details below."
              : "Fill in the details to create a new category."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter category name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="category-slug"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value
                          .toLowerCase()
                          .replace(/[^a-z0-9-]/g, "-");
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                  <p className="text-muted-foreground text-xs">
                    URL-friendly identifier (lowercase, numbers, and hyphens
                    only)
                  </p>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a color" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {colorOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center gap-2">
                            <div
                              className={`size-4 rounded-full ${option.value}`}
                            />
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

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading
                  ? isEdit
                    ? "Updating..."
                    : "Creating..."
                  : isEdit
                    ? "Update"
                    : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
