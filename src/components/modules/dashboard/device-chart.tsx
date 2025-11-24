"use client";

import { IconDeviceDesktop, IconDeviceMobile } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type DeviceUsage, getDeviceUsage } from "@/lib/api/dashboard";

export function DeviceChart() {
  const { data: deviceUsage, isLoading } = useQuery<DeviceUsage>({
    queryKey: ["device-usage"],
    queryFn: getDeviceUsage,
  });

  if (isLoading || !deviceUsage) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Used Device</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground text-sm">Loading...</div>
        </CardContent>
      </Card>
    );
  }

  const { desktop, mobile } = deviceUsage;
  const total = desktop + mobile;
  const mobilePercentage = Math.round((mobile / total) * 100);
  const desktopPercentage = Math.round((desktop / total) * 100);

  // Calculate SVG path for donut chart
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const mobileOffset = circumference - (mobilePercentage / 100) * circumference;

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Used Device</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-6 w-full">
          <div className="relative size-40">
            <svg
              className="size-full -rotate-90 transform"
              viewBox="0 0 140 140"
            >
              <title>Device Usage</title>
              {/* Background circle */}
              <circle
                cx="70"
                cy="70"
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth="20"
                className="text-muted"
              />
              {/* Mobile segment */}
              <circle
                cx="70"
                cy="70"
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth="20"
                strokeDasharray={circumference}
                strokeDashoffset={mobileOffset}
                strokeLinecap="round"
                className="text-primary transition-all duration-500"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold">{mobilePercentage}%</span>
            </div>
          </div>
          <div className="w-full space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-red-500 size-3 rounded-full" />
                <IconDeviceDesktop className="text-muted-foreground size-4" />
                <span className="text-sm">Desktop</span>
              </div>
              <span className="text-muted-foreground text-sm font-semibold">
                {desktopPercentage}%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-green-500 size-3 rounded-full" />
                <IconDeviceMobile className="text-muted-foreground size-4" />
                <span className="text-sm">Mobile</span>
              </div>
              <span className="text-muted-foreground text-sm font-semibold">
                {mobilePercentage}%
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
