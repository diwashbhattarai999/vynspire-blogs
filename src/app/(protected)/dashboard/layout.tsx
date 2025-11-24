import type React from "react";

import { AppSidebar } from "@/components/layouts/sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 18)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="sidebar" />

        {children}
      </SidebarProvider>
    </div>
  );
}
