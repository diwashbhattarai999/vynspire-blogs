"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getTopSocialMediaShares,
  type SocialMediaShare,
} from "@/lib/api/dashboard";
import {
  IconBrandFacebook,
  IconBrandTelegram,
  IconBrandTwitter,
  IconBrandWhatsapp,
  IconUsers,
} from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";

const iconMap: Record<string, typeof IconBrandFacebook> = {
  facebook: IconBrandFacebook,
  whatsapp: IconBrandWhatsapp,
  twitter: IconBrandTwitter,
  telegram: IconBrandTelegram,
  community: IconUsers,
};

export function SocialMediaShares() {
  const { data: shares = [], isLoading } = useQuery<SocialMediaShare[]>({
    queryKey: ["social-media-shares"],
    queryFn: getTopSocialMediaShares,
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Top Social Media Shared</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground text-sm">Loading...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Social Media Shared</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {shares.map((share) => {
            const Icon = iconMap[share.icon] || IconUsers;
            const formattedShares =
              share.shares >= 1000
                ? `${(share.shares / 1000).toFixed(0)}K`
                : share.shares.toLocaleString();

            return (
              <div
                key={share.platform}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="size-10">
                    <AvatarFallback className="bg-primary/10">
                      <Icon className="text-primary size-5" />
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{share.platform}</span>
                </div>
                <span className="text-muted-foreground font-semibold">
                  {formattedShares}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
