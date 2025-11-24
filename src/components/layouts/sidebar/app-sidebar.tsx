"use client";

import {
  IconDashboard,
  IconFileText,
  IconFolder,
  IconPencil,
  IconSettings,
  IconTag,
} from "@tabler/icons-react";
import type * as React from "react";

import { Logo } from "@/components/shared/logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { routes } from "@/constants/routes";

import { CommandMenu } from "./command-menu";
import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./nav-user";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const baseNavMain = [
    {
      title: "Dashboard",
      url: routes.DASHBOARD,
      icon: IconDashboard,
    },
    {
      title: "Posts",
      url: routes.DASHBOARD_ROUTES.POSTS,
      icon: IconFileText,
    },
    {
      title: "Categories",
      url: routes.DASHBOARD_ROUTES.CATEGORIES,
      icon: IconFolder,
    },
    {
      title: "Tags",
      url: routes.DASHBOARD_ROUTES.TAGS,
      icon: IconTag,
    },
    {
      title: "Create Post",
      url: routes.DASHBOARD_ROUTES.POSTS_CREATE,
      icon: IconPencil,
    },
  ];

  const data = {
    navMain: baseNavMain,
    navSecondary: [
      {
        title: "Settings",
        url: routes.DASHBOARD_ROUTES.SETTINGS,
        icon: IconSettings,
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="h-auto flex-col items-start !border-none group-data-[state=collapsed]:!size-12 hover:bg-transparent"
              size="lg"
            >
              <Logo className="text-xl group-data-[state=collapsed]:hidden" />
              <div className="grid !size-full place-items-center group-data-[state=expanded]:hidden">
                <Logo className="size-8" />
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* Search */}
        <CommandMenu />

        <NavMain items={data.navMain} />
      </SidebarContent>

      <SidebarSeparator className="mx-0" />

      <SidebarFooter>
        <NavSecondary className="mt-auto" items={data.navSecondary} />
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
