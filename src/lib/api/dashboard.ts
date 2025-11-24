export interface DashboardStats {
  followers: number;
  posts: number;
  likes: number;
  viewers: number;
}

export interface VisitorData {
  day: string;
  visitors: number;
}

export interface SocialMediaShare {
  platform: string;
  shares: number;
  icon: string;
}

export interface RecentComment {
  id: string;
  userName: string;
  userAvatar: string;
  comment: string;
  articleTitle: string;
  createdAt: string;
}

export interface RecentArticle {
  id: string;
  title: string;
  thumbnail: string;
  postDate: string;
  category: string;
  categoryColor: string;
  comments: number;
  likes: number;
  shares: number;
  viewers: number;
}

export interface DeviceUsage {
  desktop: number;
  mobile: number;
}

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getDashboardStats(): Promise<DashboardStats> {
  await delay(500);
  return {
    followers: 14200,
    posts: 150,
    likes: 140000,
    viewers: 839000,
  };
}

export async function getVisitorData(): Promise<VisitorData[]> {
  await delay(500);
  return [
    { day: "Mon", visitors: 5200 },
    { day: "Tue", visitors: 6800 },
    { day: "Wed", visitors: 7200 },
    { day: "Thu", visitors: 6100 },
    { day: "Fri", visitors: 8900 },
    { day: "Sat", visitors: 11200 },
    { day: "Sun", visitors: 9800 },
  ];
}

export async function getTopSocialMediaShares(): Promise<SocialMediaShare[]> {
  await delay(500);
  return [
    { platform: "Facebook", shares: 95000, icon: "facebook" },
    { platform: "WhatsApp", shares: 71000, icon: "whatsapp" },
    { platform: "UC Community", shares: 50000, icon: "community" },
    { platform: "Twitter", shares: 45000, icon: "twitter" },
    { platform: "Telegram", shares: 30000, icon: "telegram" },
  ];
}

export async function getRecentComments(): Promise<RecentComment[]> {
  await delay(500);
  return [
    {
      id: "1",
      userName: "Pak Inul",
      userAvatar: "",
      comment:
        "I'm Really Looking forward to The Presence Of IOS 15, I Hope You Get",
      articleTitle: "iOS 15 Features",
      createdAt: "2 hours ago",
    },
    {
      id: "2",
      userName: "Malik Abimanyu",
      userAvatar: "",
      comment: "Great article! Very informative and well written.",
      articleTitle: "Tech Trends 2024",
      createdAt: "5 hours ago",
    },
    {
      id: "3",
      userName: "Sarah Johnson",
      userAvatar: "",
      comment:
        "Thanks for sharing this. It helped me understand the topic better.",
      articleTitle: "Web Development Guide",
      createdAt: "1 day ago",
    },
    {
      id: "4",
      userName: "John Doe",
      userAvatar: "",
      comment: "Looking forward to more content like this!",
      articleTitle: "Design Principles",
      createdAt: "2 days ago",
    },
  ];
}

export async function getRecentArticles(): Promise<RecentArticle[]> {
  await delay(500);
  return [
    {
      id: "1",
      title: "Ingot/DualSense Wireless Controller Review",
      thumbnail: "",
      postDate: "07 Juni 2021",
      category: "Games",
      categoryColor:
        "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
      comments: 332,
      likes: 5000,
      shares: 999,
      viewers: 415000,
    },
    {
      id: "2",
      title: "iPadOS 15 Bawa Fitur Baru yang Menarik",
      thumbnail: "",
      postDate: "08 Juni 2021",
      category: "Techno",
      categoryColor:
        "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200",
      comments: 245,
      likes: 3200,
      shares: 567,
      viewers: 289000,
    },
    {
      id: "3",
      title: "Best Practices for React Development",
      thumbnail: "",
      postDate: "10 Juni 2021",
      category: "Development",
      categoryColor:
        "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      comments: 189,
      likes: 2100,
      shares: 432,
      viewers: 156000,
    },
    {
      id: "4",
      title: "Modern UI Design Trends 2024",
      thumbnail: "",
      postDate: "12 Juni 2021",
      category: "Design",
      categoryColor:
        "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      comments: 156,
      likes: 1800,
      shares: 321,
      viewers: 123000,
    },
  ];
}

export async function getDeviceUsage(): Promise<DeviceUsage> {
  await delay(500);
  return {
    desktop: 25,
    mobile: 75,
  };
}
