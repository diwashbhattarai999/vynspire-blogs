"use client";

import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { SiteHeader } from "@/components/layouts/header/site-header";
import { CategoryFormDialog } from "@/components/modules/categories/category-form-dialog";
import { DeleteConfirmationDialog } from "@/components/shared/delete-confirmation-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { type Category, deleteCategory, getCategories } from "@/lib/api/posts";
import { cn } from "@/lib/utils";

export default function CategoriesPage() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const queryClient = useQueryClient();

  const { data: categories = [], isLoading } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      setDeleteDialogOpen(false);
      setSelectedCategory(null);
    },
  });

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setEditDialogOpen(true);
  };

  const handleDelete = (category: Category) => {
    setSelectedCategory(category);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedCategory) {
      deleteMutation.mutate(selectedCategory.id);
    }
  };

  return (
    <div className="relative mx-auto size-full max-w-[1920px]">
      <SiteHeader title="Categories" />

      <main className="bg-background h-[calc(100vh-var(--header-height))] flex-1 overflow-x-hidden overflow-y-auto px-6 py-4">
        <div className="space-y-6">
          {/* Header with Create Button */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Categories</h1>
              <p className="text-muted-foreground mt-1 text-sm">
                Manage your post categories
              </p>
            </div>
            <Button onClick={() => setCreateDialogOpen(true)}>
              <IconPlus className="mr-2 size-4" />
              Create Category
            </Button>
          </div>

          {/* Categories Card */}
          <Card>
            <CardHeader>
              <CardTitle>All Categories</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Spinner className="text-primary size-6" />
                </div>
              ) : categories.length === 0 ? (
                <div className="bg-muted rounded-lg border p-12 text-center">
                  <p className="text-muted-foreground text-lg">
                    No categories found. Create your first category to get
                    started.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-muted-foreground text-left text-xs font-medium py-3">
                          Category
                        </th>
                        <th className="text-muted-foreground text-left text-xs font-medium py-3">
                          Slug
                        </th>
                        <th className="text-muted-foreground text-left text-xs font-medium py-3">
                          Posts
                        </th>
                        <th className="text-muted-foreground text-right text-xs font-medium py-3">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map((category) => (
                        <tr
                          key={category.id}
                          className="border-b transition-colors hover:bg-muted/50"
                        >
                          <td className="py-4">
                            <div className="flex items-center gap-3">
                              <div
                                className={cn(
                                  "size-4 rounded-full",
                                  category.color,
                                )}
                              />
                              <span className="font-medium">
                                {category.name}
                              </span>
                            </div>
                          </td>
                          <td className="py-4">
                            <Badge
                              variant="outline"
                              className="font-mono text-xs"
                            >
                              {category.slug}
                            </Badge>
                          </td>
                          <td className="py-4">
                            <span className="text-muted-foreground text-sm">
                              {category.count}{" "}
                              {category.count === 1 ? "post" : "posts"}
                            </span>
                          </td>
                          <td className="py-4">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEdit(category)}
                              >
                                <IconEdit className="size-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDelete(category)}
                              >
                                <IconTrash className="text-destructive size-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Create Category Dialog */}
        <CategoryFormDialog
          open={createDialogOpen}
          onOpenChange={setCreateDialogOpen}
        />

        {/* Edit Category Dialog */}
        <CategoryFormDialog
          open={editDialogOpen}
          onOpenChange={(open) => {
            setEditDialogOpen(open);
            if (!open) {
              setSelectedCategory(null);
            }
          }}
          category={selectedCategory}
        />

        {/* Delete Confirmation Dialog */}
        <DeleteConfirmationDialog
          open={deleteDialogOpen}
          onOpenChange={(open) => {
            setDeleteDialogOpen(open);
            if (!open) {
              setSelectedCategory(null);
            }
          }}
          onConfirm={handleDeleteConfirm}
          title="Delete Category"
          description="Are you sure you want to delete this category?"
          itemName={selectedCategory?.name}
          isLoading={deleteMutation.isPending}
        />
      </main>
    </div>
  );
}
