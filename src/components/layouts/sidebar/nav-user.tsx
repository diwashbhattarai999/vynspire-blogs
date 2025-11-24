import { IconLogout, IconSelector, IconUsers } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";

import { LogoutConfirmationDialog } from "@/components/shared/logout-confirmation-dialog";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { routes } from "@/constants/routes";
import { useAuth } from "@/contexts/auth-context";

export function NavUser() {
  const { isMobile } = useSidebar();
  const { user } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const userDisplayName = user
    ? `${user.firstName} ${user.lastName}`.trim()
    : "User";
  const userInitials = user
    ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
    : "U";

  const NAV_USER_OPTIONS =
    user?.role === "ADMIN"
      ? [
          {
            icon: IconUsers,
            label: "Manage Users",
            link: routes.DASHBOARD_ROUTES.USERS,
          },
        ]
      : [];

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              className="group-data-[collapsible=icon]:hover:bg-transparent outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-0"
              size="lg"
              tooltip="User Menu"
            >
              <Avatar className="size-8 rounded-lg">
                <AvatarImage
                  alt={userDisplayName}
                  src={user?.profilePictureUrl ?? ""}
                />
                <AvatarFallback className="rounded-lg">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{userDisplayName}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {user?.email}
                </span>
              </div>
              <IconSelector className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg py-2"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="size-8 rounded-lg">
                  <AvatarImage
                    alt={userDisplayName}
                    src={user?.profilePictureUrl ?? ""}
                  />
                  <AvatarFallback className="rounded-lg">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {userDisplayName}
                  </span>
                  <span className="text-muted-foreground truncate text-xs">
                    {user?.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <ThemeToggle />
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              {NAV_USER_OPTIONS.map((option) => {
                const Icon = option.icon;
                return (
                  <DropdownMenuItem
                    key={option.link}
                    asChild
                    className="group py-2"
                  >
                    <Link href={option.link} className="flex-1">
                      <Icon className="mr-2 size-4 group-hover:text-primary" />
                      {option.label}
                    </Link>
                  </DropdownMenuItem>
                );
              })}

              {NAV_USER_OPTIONS.length > 0 && <DropdownMenuSeparator />}

              <LogoutConfirmationDialog asChild>
                <DropdownMenuItem
                  className="py-2"
                  variant="destructive"
                  onSelect={(e) => {
                    e.preventDefault();
                  }}
                >
                  <IconLogout className="mr-2 size-4" />
                  Log out
                </DropdownMenuItem>
              </LogoutConfirmationDialog>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
