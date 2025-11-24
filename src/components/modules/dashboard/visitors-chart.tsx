"use client";

import { useQuery } from "@tanstack/react-query";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getVisitorData, type VisitorData } from "@/lib/api/dashboard";

export function VisitorsChart() {
  const { data: visitorData = [], isLoading } = useQuery<VisitorData[]>({
    queryKey: ["visitor-data"],
    queryFn: getVisitorData,
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Site Visitors</CardTitle>
            <Select defaultValue="monthly">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center">
            <div className="text-muted-foreground text-sm">Loading...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const maxVisitors = Math.max(...visitorData.map((v) => v.visitors));
  const minVisitors = Math.min(...visitorData.map((v) => v.visitors));

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Site Visitors</CardTitle>
          <Select defaultValue="monthly">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64 flex items-end justify-between max-w-[48rem] mx-auto gap-3 pb-8 mt-12 w-full">
          {visitorData.map((data) => {
            // Calculate height as percentage of the max value (not range-based)
            // This ensures bars vary properly and use the full height range
            const height = (data.visitors / maxVisitors) * 100;
            return (
              <div
                key={data.day}
                className="flex flex-col items-center gap-2 group relative h-full w-12"
              >
                <div className="bg-primary/10 hover:bg-primary/20 rounded-t transition-colors w-full flex items-end justify-center relative h-full">
                  <div
                    className="bg-primary rounded-t w-full transition-all duration-300 hover:opacity-90"
                    style={{ height: `${Math.max(height, 8)}%` }}
                  />
                  <div className="bg-primary text-primary-foreground absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity px-2 py-1 rounded text-xs whitespace-nowrap z-10 shadow-md">
                    {data.visitors.toLocaleString()} Visitor
                  </div>
                </div>
                <span className="text-muted-foreground text-xs font-medium">
                  {data.day}
                </span>
              </div>
            );
          })}
        </div>
        <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground px-1">
          <span>{minVisitors.toLocaleString()}</span>
          <span>{maxVisitors.toLocaleString()}</span>
        </div>
      </CardContent>
    </Card>
  );
}
