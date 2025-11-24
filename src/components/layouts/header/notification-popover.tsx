"use client";

import {
  AlertTriangle,
  Bell,
  Check,
  CheckCheck,
  CheckCircle,
  Info,
  Settings,
  X,
} from "lucide-react";
import React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  type: "info" | "warning" | "success" | "error";
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
  avatar?: string;
}

// Mock notifications data
const MOCK_NOTIFICATIONS: Array<Notification> = [
  {
    id: "1",
    type: "success",
    title: "Payment Successful",
    description: "Your subscription has been renewed successfully",
    timestamp: "2 minutes ago",
    isRead: false,
  },
  {
    id: "2",
    type: "info",
    title: "New Feature Available",
    description: "Check out our new dashboard analytics feature",
    timestamp: "1 hour ago",
    isRead: false,
  },
  {
    id: "3",
    type: "warning",
    title: "Storage Almost Full",
    description: "You are using 85% of your storage quota",
    timestamp: "3 hours ago",
    isRead: true,
  },
  {
    id: "4",
    type: "info",
    title: "Profile Updated",
    description: "Your profile information has been updated",
    timestamp: "1 day ago",
    isRead: true,
  },
  {
    id: "5",
    type: "error",
    title: "Failed Login Attempt",
    description: "Someone tried to access your account from unknown device",
    timestamp: "2 days ago",
    isRead: true,
  },
];

const getNotificationIcon = (type: Notification["type"]) => {
  switch (type) {
    case "success":
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case "warning":
      return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    case "error":
      return <X className="h-4 w-4 text-red-500" />;
    default:
      return <Info className="h-4 w-4 text-blue-500" />;
  }
};

const getNotificationBgColor = (type: Notification["type"]) => {
  switch (type) {
    case "success":
      return "bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800/30";
    case "warning":
      return "bg-yellow-50 border-yellow-200 dark:bg-yellow-950/20 dark:border-yellow-800/30";
    case "error":
      return "bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-800/30";
    default:
      return "bg-blue-50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-800/30";
  }
};

export const NotificationPopover = () => {
  const [notifications, setNotifications] =
    React.useState<Array<Notification>>(MOCK_NOTIFICATIONS);
  const [isOpen, setIsOpen] = React.useState(false);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification,
      ),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, isRead: true })),
    );
  };

  const clearNotification = (id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id),
    );
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          className="relative p-1"
          size="icon"
          title="Notifications"
          variant="ghost"
        >
          <Bell className="!size-5" />

          {unreadCount > 0 && (
            <Badge
              className="absolute top-0 right-0 flex size-5 items-center justify-center rounded-full p-0 text-xs font-medium"
              variant="destructive"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-96 p-0" sideOffset={8}>
        <div className="flex items-center justify-between p-4 pb-2">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold">Notifications</h3>
            {unreadCount > 0 && (
              <Badge className="text-xs" variant="secondary">
                {unreadCount} new
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-1">
            {unreadCount > 0 && (
              <Button
                className="h-8 px-2 text-xs"
                size="sm"
                variant="ghost"
                onClick={markAllAsRead}
              >
                <CheckCheck className="mr-1 h-3 w-3" />
                Mark all read
              </Button>
            )}
            <Button
              className="h-8 w-8"
              size="icon"
              title="Settings"
              variant="ghost"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Separator />

        <ScrollArea className="h-[400px]">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Bell className="text-muted-foreground mb-2 h-8 w-8" />
              <p className="text-muted-foreground text-sm">No notifications</p>
              <p className="text-muted-foreground mt-1 text-xs">
                You're all caught up!
              </p>
            </div>
          ) : (
            <div className="p-2">
              {notifications.map((notification, index) => (
                <div key={notification.id}>
                  <button
                    type="button"
                    className={cn(
                      "group relative cursor-pointer rounded-lg border p-3 transition-all hover:shadow-sm w-full text-left",
                      notification.isRead
                        ? "bg-background border-border"
                        : getNotificationBgColor(notification.type),
                      !notification.isRead && "shadow-sm",
                    )}
                    aria-pressed={!notification.isRead}
                    onClick={() => {
                      if (!notification.isRead) {
                        markAsRead(notification.id);
                      }
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex-shrink-0">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <p
                              className={cn(
                                "text-sm leading-tight font-medium",
                                !notification.isRead && "font-semibold",
                              )}
                            >
                              {notification.title}
                            </p>
                            <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                              {notification.description}
                            </p>
                            <p className="text-muted-foreground mt-2 text-xs">
                              {notification.timestamp}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                            {!notification.isRead && (
                              <Button
                                className="h-6 w-6"
                                size="icon"
                                title="Mark as read"
                                variant="ghost"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  markAsRead(notification.id);
                                }}
                              >
                                <Check className="h-3 w-3" />
                              </Button>
                            )}
                            <Button
                              className="h-6 w-6"
                              size="icon"
                              title="Remove notification"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation();
                                clearNotification(notification.id);
                              }}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {!notification.isRead && (
                      <div className="absolute top-3 right-3 h-2 w-2 rounded-full bg-blue-500" />
                    )}
                  </button>
                  {index < notifications.length - 1 && <div className="my-2" />}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {notifications.length > 0 && (
          <>
            <Separator />
            <div className="p-2">
              <Button
                className="w-full justify-center text-sm"
                variant="ghost"
                onClick={() => setIsOpen(false)}
              >
                View all notifications
              </Button>
            </div>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
};
