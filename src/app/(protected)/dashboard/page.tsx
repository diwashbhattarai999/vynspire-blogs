"use client";

import { useQuery } from "@tanstack/react-query";
import {
  IconUsers,
  IconFileText,
  IconHeart,
  IconChartBar,
} from "@tabler/icons-react";
import { SiteHeader } from "@/components/layouts/header/site-header";
import { StatCard } from "@/components/modules/dashboard/stat-card";
import { VisitorsChart } from "@/components/modules/dashboard/visitors-chart";
import { SocialMediaShares } from "@/components/modules/dashboard/social-media-shares";
import { RecentComments } from "@/components/modules/dashboard/recent-comments";
import { RecentArticles } from "@/components/modules/dashboard/recent-articles";
import { DeviceChart } from "@/components/modules/dashboard/device-chart";
import { getDashboardStats } from "@/lib/api/dashboard";

export default function DashboardPage() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: getDashboardStats,
  });

  return (
    <div className="relative mx-auto size-full max-w-[1920px]">
      <SiteHeader title="Dashboard" />

      <main className="bg-background h-[calc(100vh-var(--header-height))] flex-1 overflow-x-hidden overflow-y-auto px-6 py-4">
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Followers"
              value={stats?.followers || 0}
              icon={IconUsers}
            />
            <StatCard
              title="Post"
              value={stats?.posts || 0}
              icon={IconFileText}
            />
            <StatCard
              title="Likes"
              value={stats?.likes || 0}
              icon={IconHeart}
            />
            <StatCard
              title="Viewers"
              value={stats?.viewers || 0}
              icon={IconChartBar}
            />
          </div>

          {/* Charts Row */}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="md:col-span-2">
              <VisitorsChart />
            </div>
            <div className="h-full">
              <DeviceChart />
            </div>
          </div>

          {/* Social Media and Comments Row */}
          <div className="grid gap-4 md:grid-cols-2">
            <SocialMediaShares />
            <RecentComments />
          </div>

          {/* Recent Articles */}
          <RecentArticles />
        </div>
      </main>
    </div>
  );
}
