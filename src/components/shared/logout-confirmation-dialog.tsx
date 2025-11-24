"use client";

import { IconLogout } from "@tabler/icons-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";

interface LogoutConfirmationDialogProps {
  children?: React.ReactNode;
  asChild?: boolean;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  onOpenChange?: (open: boolean) => void;
}

export function LogoutConfirmationDialog({
  children,
  asChild = false,
  variant = "default",
  size = "default",
  className,
  onOpenChange,
}: LogoutConfirmationDialogProps) {
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const defaultTrigger = (
    <Button className={className} size={size} variant={variant}>
      <IconLogout className="h-4 w-4" />
      Log Out
    </Button>
  );

  return (
    <AlertDialog onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild={asChild}>
        {children || defaultTrigger}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <IconLogout className="h-5 w-5" />
            Confirm Logout
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to log out
            {user?.firstName && user?.lastName
              ? `, ${user.firstName} ${user.lastName}`
              : ""}
            ? You will need to sign in again to access your account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout}>
            <IconLogout className="mr-2 h-4 w-4" />
            Log Out
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
