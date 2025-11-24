export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: {
    name: string;
    avatar: string;
  };
  category: string;
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  readTime: number;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  status: "published" | "draft" | "archived";
  featured: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
  color: string;
}

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const mockPosts: Post[] = [
  {
    id: "1",
    title: "Ingot/DualSense Wireless Controller Review",
    excerpt:
      "A comprehensive review of the latest gaming controller with advanced haptic feedback and adaptive triggers.",
    content: "Full content here...",
    coverImage: "",
    author: {
      name: "John Doe",
      avatar: "",
    },
    category: "Games",
    tags: ["Gaming", "Review", "Hardware"],
    publishedAt: "2021-06-07",
    updatedAt: "2021-06-07",
    readTime: 5,
    views: 415000,
    likes: 5000,
    comments: 332,
    shares: 999,
    status: "published",
    featured: true,
  },
  {
    id: "2",
    title: "iPadOS 15 Bawa Fitur Baru yang Menarik",
    excerpt:
      "Explore the exciting new features coming to iPadOS 15 that will enhance your productivity and creativity.",
    content: "Full content here...",
    coverImage: "",
    author: {
      name: "Jane Smith",
      avatar: "",
    },
    category: "Techno",
    tags: ["Apple", "iPad", "Software"],
    publishedAt: "2021-06-08",
    updatedAt: "2021-06-08",
    readTime: 8,
    views: 289000,
    likes: 3200,
    comments: 245,
    shares: 567,
    status: "published",
    featured: true,
  },
  {
    id: "3",
    title: "Best Practices for React Development",
    excerpt:
      "Learn the essential best practices and patterns for building scalable React applications.",
    content: "Full content here...",
    coverImage: "",
    author: {
      name: "Sarah Johnson",
      avatar: "",
    },
    category: "Development",
    tags: ["React", "JavaScript", "Web Development"],
    publishedAt: "2021-06-10",
    updatedAt: "2021-06-10",
    readTime: 12,
    views: 156000,
    likes: 2100,
    comments: 189,
    shares: 432,
    status: "published",
    featured: false,
  },
  {
    id: "4",
    title: "Modern UI Design Trends 2024",
    excerpt:
      "Discover the latest UI design trends that are shaping the digital landscape in 2024.",
    content: "Full content here...",
    coverImage: "",
    author: {
      name: "Mike Wilson",
      avatar: "",
    },
    category: "Design",
    tags: ["Design", "UI/UX", "Trends"],
    publishedAt: "2021-06-12",
    updatedAt: "2021-06-12",
    readTime: 6,
    views: 123000,
    likes: 1800,
    comments: 156,
    shares: 321,
    status: "published",
    featured: false,
  },
  {
    id: "5",
    title: "Getting Started with Next.js 14",
    excerpt:
      "A beginner-friendly guide to building modern web applications with Next.js 14.",
    content: "Full content here...",
    coverImage: "",
    author: {
      name: "Alex Brown",
      avatar: "",
    },
    category: "Development",
    tags: ["Next.js", "React", "Tutorial"],
    publishedAt: "2021-06-15",
    updatedAt: "2021-06-15",
    readTime: 10,
    views: 98000,
    likes: 1500,
    comments: 98,
    shares: 234,
    status: "published",
    featured: false,
  },
  {
    id: "6",
    title: "Understanding TypeScript Generics",
    excerpt:
      "Deep dive into TypeScript generics and how to use them effectively in your projects.",
    content: "Full content here...",
    coverImage: "",
    author: {
      name: "Emily Davis",
      avatar: "",
    },
    category: "Development",
    tags: ["TypeScript", "Programming", "Tutorial"],
    publishedAt: "2021-06-18",
    updatedAt: "2021-06-18",
    readTime: 15,
    views: 87000,
    likes: 1200,
    comments: 87,
    shares: 198,
    status: "published",
    featured: false,
  },
  {
    id: "7",
    title: "The Future of Web Development",
    excerpt:
      "Exploring emerging technologies and trends that will shape the future of web development.",
    content: "Full content here...",
    coverImage: "",
    author: {
      name: "David Lee",
      avatar: "",
    },
    category: "Techno",
    tags: ["Web Development", "Future", "Technology"],
    publishedAt: "2021-06-20",
    updatedAt: "2021-06-20",
    readTime: 9,
    views: 112000,
    likes: 1900,
    comments: 134,
    shares: 345,
    status: "published",
    featured: false,
  },
  {
    id: "8",
    title: "Color Theory in Digital Design",
    excerpt:
      "Master the art of color selection and create visually appealing digital designs.",
    content: "Full content here...",
    coverImage: "",
    author: {
      name: "Lisa Chen",
      avatar: "",
    },
    category: "Design",
    tags: ["Design", "Color Theory", "UI/UX"],
    publishedAt: "2021-06-22",
    updatedAt: "2021-06-22",
    readTime: 7,
    views: 95000,
    likes: 1400,
    comments: 112,
    shares: 267,
    status: "published",
    featured: false,
  },
];

const mockCategories: Category[] = [
  {
    id: "1",
    name: "All",
    slug: "all",
    count: mockPosts.length,
    color: "bg-gray-500",
  },
  { id: "2", name: "Games", slug: "games", count: 1, color: "bg-pink-500" },
  { id: "3", name: "Techno", slug: "techno", count: 2, color: "bg-teal-500" },
  {
    id: "4",
    name: "Development",
    slug: "development",
    count: 3,
    color: "bg-blue-500",
  },
  { id: "5", name: "Design", slug: "design", count: 2, color: "bg-purple-500" },
];

export interface GetPostsParams {
  search?: string;
  category?: string;
  status?: Post["status"];
  featured?: boolean;
  page?: number;
  limit?: number;
}

export interface GetPostsResponse {
  posts: Post[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export async function getPosts(
  params: GetPostsParams = {},
): Promise<GetPostsResponse> {
  await delay(500);

  const {
    search = "",
    category,
    status = "published",
    featured,
    page = 1,
    limit = 12,
  } = params;

  let filteredPosts = [...mockPosts];

  // Filter by status
  filteredPosts = filteredPosts.filter((post) => post.status === status);

  // Filter by search
  if (search) {
    const searchLower = search.toLowerCase();
    filteredPosts = filteredPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchLower) ||
        post.excerpt.toLowerCase().includes(searchLower) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchLower)),
    );
  }

  // Filter by category
  if (category && category !== "all") {
    filteredPosts = filteredPosts.filter(
      (post) => post.category.toLowerCase() === category.toLowerCase(),
    );
  }

  // Filter by featured
  if (featured !== undefined) {
    filteredPosts = filteredPosts.filter((post) => post.featured === featured);
  }

  // Pagination
  const total = filteredPosts.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

  return {
    posts: paginatedPosts,
    total,
    page,
    limit,
    totalPages,
  };
}

export async function getCategories(): Promise<Category[]> {
  await delay(300);
  return mockCategories;
}

export async function getPostById(id: string): Promise<Post | null> {
  await delay(300);
  return mockPosts.find((post) => post.id === id) || null;
}
