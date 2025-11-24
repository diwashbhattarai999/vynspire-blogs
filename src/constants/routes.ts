export const routes = {
  HOME: "/",
  ABOUT_US: "/about-us",
  CONTACT: "/contact",
  DASHBOARD: "/dashboard",
  SUPPORT: "/support",
  AUTH: {
    LOGIN: "/login",
    REGISTER: "/register",
    FORGOT_PASSWORD: "/forgot-password",
  },
  TERMS: "/terms",
  PRIVACY: "/privacy",
  DASHBOARD_ROUTES: {
    POSTS: "/dashboard/posts",
    POSTS_CREATE: "/dashboard/posts/create",
    CATEGORIES: "/dashboard/categories",
    TAGS: "/dashboard/tags",
    SETTINGS: "/dashboard/settings",
    USERS: "/dashboard/users",
    MESSAGES: "/dashboard/messages",
  },
} as const;
