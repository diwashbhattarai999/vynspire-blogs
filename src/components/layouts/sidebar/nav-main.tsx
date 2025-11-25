"use client";

import { IconChevronRight, type TablerIcon } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { routes } from "@/constants/routes";

interface NavItem {
  title: string;
  url: string;
  icon?: TablerIcon;
  isCollapsible?: boolean;
  items?: Array<{
    title: string;
    url: string;
  }>;
  show?: boolean;
}

export function NavMain({ items }: { items: Array<NavItem> }) {
  const pathname = usePathname();
  const { open } = useSidebar();

  const isActive = (url: string) =>
    pathname === url || (pathname.startsWith(url) && url !== routes.DASHBOARD);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Navigation</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const Icon = item.icon;

          if (item.isCollapsible && item.items?.length) {
            return (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    {open ? (
                      <SidebarMenuButton
                        className="group-data-[collapsible=icon]:ml-1"
                        isActive={isActive(item.url)}
                        tooltip={item.title}
                      >
                        {Icon && (
                          <Icon className="text-muted-foreground size-4" />
                        )}
                        <span>{item.title}</span>
                        <IconChevronRight className="ml-auto size-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    ) : (
                      <SidebarMenuButton
                        asChild
                        className="group-data-[collapsible=icon]:ml-1"
                        isActive={isActive(item.url)}
                        tooltip={item.title}
                      >
                        <Link href={item.url}>
                          {Icon && <Icon className="size-4" />}
                          <span>{item.title}</span>
                            <IconChevronRight className="ml-auto size-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </Link>
                      </SidebarMenuButton>
                    )}
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.url}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={isActive(subItem.url)}
                          >
                            <Link href={subItem.url}>
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            );
          }

          // Non-collapsible item
          return (
            <SidebarMenuItem key={item.url}>
              <SidebarMenuButton
                asChild
                className="group-data-[collapsible=icon]:ml-1"
                isActive={isActive(item.url)}
                tooltip={item.title}
              >
                <Link href={item.url}>
                  {Icon && <Icon className="text-muted-foreground size-4" />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
