export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: {
    name: string;
    avatar: string;
    email: string;
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

export interface Tag {
  name: string;
  count: number;
}

export interface PostComment {
  id: string;
  postId: string;
  userName: string;
  userAvatar: string;
  userEmail: string;
  comment: string;
  createdAt: string;
  updatedAt?: string;
  likes: number;
  replies?: PostComment[];
}

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const mockPosts: Post[] = [
  {
    id: "1",
    title: "Ingot/DualSense Wireless Controller Review",
    excerpt:
      "A comprehensive review of the latest gaming controller with advanced haptic feedback and adaptive triggers.",
    content: `# Ingot/DualSense Wireless Controller Review

A comprehensive review of the latest gaming controller with advanced haptic feedback and adaptive triggers.

## Introduction

The DualSense Wireless Controller represents a significant leap forward in gaming controller technology. With its innovative haptic feedback system and adaptive triggers, it offers an immersive gaming experience that was previously unimaginable.

## Key Features

### Haptic Feedback

The controller's haptic feedback system provides incredibly detailed vibrations that can simulate various textures and sensations. Whether you're walking on different surfaces or experiencing environmental effects, the haptic feedback adds a new dimension to gameplay.

### Adaptive Triggers

The adaptive triggers offer variable resistance, allowing developers to create unique gameplay mechanics. For example, drawing a bowstring or accelerating a vehicle feels more realistic and engaging.

### Design and Ergonomics

The controller features an ergonomic design that fits comfortably in your hands, even during extended gaming sessions. The button layout is intuitive and responsive.

## Performance

In testing, the controller performed exceptionally well across various game genres. The battery life is impressive, lasting up to 12 hours on a single charge.

## Conclusion

The DualSense Wireless Controller is a must-have for any serious gamer. Its innovative features and excellent build quality make it worth the investment.`,
    coverImage: "",
    author: {
      name: "John Doe",
      avatar: "",
      email: "john@example.com",
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
    content: `# Ingot/DualSense Wireless Controller Review

A comprehensive review of the latest gaming controller with advanced haptic feedback and adaptive triggers.

## Introduction

The DualSense Wireless Controller represents a significant leap forward in gaming controller technology. With its innovative haptic feedback system and adaptive triggers, it offers an immersive gaming experience that was previously unimaginable.

## Key Features

### Haptic Feedback

The controller's haptic feedback system provides incredibly detailed vibrations that can simulate various textures and sensations. Whether you're walking on different surfaces or experiencing environmental effects, the haptic feedback adds a new dimension to gameplay.

### Adaptive Triggers

The adaptive triggers offer variable resistance, allowing developers to create unique gameplay mechanics. For example, drawing a bowstring or accelerating a vehicle feels more realistic and engaging.

### Design and Ergonomics

The controller features an ergonomic design that fits comfortably in your hands, even during extended gaming sessions. The button layout is intuitive and responsive.

## Performance

In testing, the controller performed exceptionally well across various game genres. The battery life is impressive, lasting up to 12 hours on a single charge.

## Conclusion

The DualSense Wireless Controller is a must-have for any serious gamer. Its innovative features and excellent build quality make it worth the investment.`,
    coverImage: "",
    author: {
      name: "Jane Smith",
      avatar: "",
      email: "jane@example.com",
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
    content: `# Ingot/DualSense Wireless Controller Review

A comprehensive review of the latest gaming controller with advanced haptic feedback and adaptive triggers.

## Introduction

The DualSense Wireless Controller represents a significant leap forward in gaming controller technology. With its innovative haptic feedback system and adaptive triggers, it offers an immersive gaming experience that was previously unimaginable.

## Key Features

### Haptic Feedback

The controller's haptic feedback system provides incredibly detailed vibrations that can simulate various textures and sensations. Whether you're walking on different surfaces or experiencing environmental effects, the haptic feedback adds a new dimension to gameplay.

### Adaptive Triggers

The adaptive triggers offer variable resistance, allowing developers to create unique gameplay mechanics. For example, drawing a bowstring or accelerating a vehicle feels more realistic and engaging.

### Design and Ergonomics

The controller features an ergonomic design that fits comfortably in your hands, even during extended gaming sessions. The button layout is intuitive and responsive.

## Performance

In testing, the controller performed exceptionally well across various game genres. The battery life is impressive, lasting up to 12 hours on a single charge.

## Conclusion

The DualSense Wireless Controller is a must-have for any serious gamer. Its innovative features and excellent build quality make it worth the investment.`,
    coverImage: "",
    author: {
      name: "Sarah Johnson",
      avatar: "",
      email: "diwashb999@gmail.com",
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
    content: `# Ingot/DualSense Wireless Controller Review

A comprehensive review of the latest gaming controller with advanced haptic feedback and adaptive triggers.

## Introduction

The DualSense Wireless Controller represents a significant leap forward in gaming controller technology. With its innovative haptic feedback system and adaptive triggers, it offers an immersive gaming experience that was previously unimaginable.

## Key Features

### Haptic Feedback

The controller's haptic feedback system provides incredibly detailed vibrations that can simulate various textures and sensations. Whether you're walking on different surfaces or experiencing environmental effects, the haptic feedback adds a new dimension to gameplay.

### Adaptive Triggers

The adaptive triggers offer variable resistance, allowing developers to create unique gameplay mechanics. For example, drawing a bowstring or accelerating a vehicle feels more realistic and engaging.

### Design and Ergonomics

The controller features an ergonomic design that fits comfortably in your hands, even during extended gaming sessions. The button layout is intuitive and responsive.

## Performance

In testing, the controller performed exceptionally well across various game genres. The battery life is impressive, lasting up to 12 hours on a single charge.

## Conclusion

The DualSense Wireless Controller is a must-have for any serious gamer. Its innovative features and excellent build quality make it worth the investment.`,
    coverImage: "",
    author: {
      name: "Mike Wilson",
      avatar: "",
      email: "mike@example.com",
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
    content: `# Ingot/DualSense Wireless Controller Review

A comprehensive review of the latest gaming controller with advanced haptic feedback and adaptive triggers.

## Introduction

The DualSense Wireless Controller represents a significant leap forward in gaming controller technology. With its innovative haptic feedback system and adaptive triggers, it offers an immersive gaming experience that was previously unimaginable.

## Key Features

### Haptic Feedback

The controller's haptic feedback system provides incredibly detailed vibrations that can simulate various textures and sensations. Whether you're walking on different surfaces or experiencing environmental effects, the haptic feedback adds a new dimension to gameplay.

### Adaptive Triggers

The adaptive triggers offer variable resistance, allowing developers to create unique gameplay mechanics. For example, drawing a bowstring or accelerating a vehicle feels more realistic and engaging.

### Design and Ergonomics

The controller features an ergonomic design that fits comfortably in your hands, even during extended gaming sessions. The button layout is intuitive and responsive.

## Performance

In testing, the controller performed exceptionally well across various game genres. The battery life is impressive, lasting up to 12 hours on a single charge.

## Conclusion

The DualSense Wireless Controller is a must-have for any serious gamer. Its innovative features and excellent build quality make it worth the investment.`,
    coverImage: "",
    author: {
      name: "Alex Brown",
      avatar: "",
      email: "diwashb999@gmail.com",
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
    content: `# Ingot/DualSense Wireless Controller Review

A comprehensive review of the latest gaming controller with advanced haptic feedback and adaptive triggers.

## Introduction

The DualSense Wireless Controller represents a significant leap forward in gaming controller technology. With its innovative haptic feedback system and adaptive triggers, it offers an immersive gaming experience that was previously unimaginable.

## Key Features

### Haptic Feedback

The controller's haptic feedback system provides incredibly detailed vibrations that can simulate various textures and sensations. Whether you're walking on different surfaces or experiencing environmental effects, the haptic feedback adds a new dimension to gameplay.

### Adaptive Triggers

The adaptive triggers offer variable resistance, allowing developers to create unique gameplay mechanics. For example, drawing a bowstring or accelerating a vehicle feels more realistic and engaging.

### Design and Ergonomics

The controller features an ergonomic design that fits comfortably in your hands, even during extended gaming sessions. The button layout is intuitive and responsive.

## Performance

In testing, the controller performed exceptionally well across various game genres. The battery life is impressive, lasting up to 12 hours on a single charge.

## Conclusion

The DualSense Wireless Controller is a must-have for any serious gamer. Its innovative features and excellent build quality make it worth the investment.`,
    coverImage: "",
    author: {
      name: "Emily Davis",
      avatar: "",
      email: "emily@example.com",
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
    content: `# Ingot/DualSense Wireless Controller Review

A comprehensive review of the latest gaming controller with advanced haptic feedback and adaptive triggers.

## Introduction

The DualSense Wireless Controller represents a significant leap forward in gaming controller technology. With its innovative haptic feedback system and adaptive triggers, it offers an immersive gaming experience that was previously unimaginable.

## Key Features

### Haptic Feedback

The controller's haptic feedback system provides incredibly detailed vibrations that can simulate various textures and sensations. Whether you're walking on different surfaces or experiencing environmental effects, the haptic feedback adds a new dimension to gameplay.

### Adaptive Triggers

The adaptive triggers offer variable resistance, allowing developers to create unique gameplay mechanics. For example, drawing a bowstring or accelerating a vehicle feels more realistic and engaging.

### Design and Ergonomics

The controller features an ergonomic design that fits comfortably in your hands, even during extended gaming sessions. The button layout is intuitive and responsive.

## Performance

In testing, the controller performed exceptionally well across various game genres. The battery life is impressive, lasting up to 12 hours on a single charge.

## Conclusion

The DualSense Wireless Controller is a must-have for any serious gamer. Its innovative features and excellent build quality make it worth the investment.`,
    coverImage: "",
    author: {
      name: "David Lee",
      avatar: "",
      email: "david@example.com",
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
    content: `# Ingot/DualSense Wireless Controller Review

A comprehensive review of the latest gaming controller with advanced haptic feedback and adaptive triggers.

## Introduction

The DualSense Wireless Controller represents a significant leap forward in gaming controller technology. With its innovative haptic feedback system and adaptive triggers, it offers an immersive gaming experience that was previously unimaginable.

## Key Features

### Haptic Feedback

The controller's haptic feedback system provides incredibly detailed vibrations that can simulate various textures and sensations. Whether you're walking on different surfaces or experiencing environmental effects, the haptic feedback adds a new dimension to gameplay.

### Adaptive Triggers

The adaptive triggers offer variable resistance, allowing developers to create unique gameplay mechanics. For example, drawing a bowstring or accelerating a vehicle feels more realistic and engaging.

### Design and Ergonomics

The controller features an ergonomic design that fits comfortably in your hands, even during extended gaming sessions. The button layout is intuitive and responsive.

## Performance

In testing, the controller performed exceptionally well across various game genres. The battery life is impressive, lasting up to 12 hours on a single charge.

## Conclusion

The DualSense Wireless Controller is a must-have for any serious gamer. Its innovative features and excellent build quality make it worth the investment.`,
    coverImage: "",
    author: {
      name: "Lisa Chen",
      avatar: "",
      email: "lisa@example.com",
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
  tag?: string;
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
    tag,
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

  // Filter by tag
  if (tag) {
    filteredPosts = filteredPosts.filter((post) =>
      post.tags.some((postTag) => postTag.toLowerCase() === tag.toLowerCase()),
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
  // Filter out "All" category for the categories page
  return mockCategories.filter((cat) => cat.slug !== "all");
}

export async function getTags(): Promise<Tag[]> {
  await delay(300);
  // Extract all tags from published posts and count occurrences
  const tagCounts = new Map<string, number>();

  mockPosts
    .filter((post) => post.status === "published")
    .forEach((post) => {
      post.tags.forEach((tag) => {
        const currentCount = tagCounts.get(tag) || 0;
        tagCounts.set(tag, currentCount + 1);
      });
    });

  // Convert to array and sort by count (descending), then by name
  const tags: Tag[] = Array.from(tagCounts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => {
      if (b.count !== a.count) {
        return b.count - a.count;
      }
      return a.name.localeCompare(b.name);
    });

  return tags;
}

export interface CreateCategoryData {
  name: string;
  slug: string;
  color: string;
}

export interface UpdateCategoryData {
  name: string;
  slug: string;
  color: string;
}

export async function createCategory(
  data: CreateCategoryData,
): Promise<Category> {
  await delay(400);
  // Generate unique ID by finding the maximum existing ID and incrementing
  const maxId = Math.max(
    ...mockCategories.map((cat) => parseInt(cat.id, 10)),
    0,
  );
  const newCategory: Category = {
    id: String(maxId + 1),
    name: data.name,
    slug: data.slug,
    count: 0,
    color: data.color,
  };
  mockCategories.push(newCategory);
  return newCategory;
}

export async function updateCategory(
  id: string,
  data: UpdateCategoryData,
): Promise<Category> {
  await delay(400);
  const categoryIndex = mockCategories.findIndex((c) => c.id === id);
  if (categoryIndex === -1) {
    throw new Error("Category not found");
  }

  const updatedCategory: Category = {
    ...mockCategories[categoryIndex],
    name: data.name,
    slug: data.slug,
    color: data.color,
  };

  mockCategories[categoryIndex] = updatedCategory;
  return updatedCategory;
}

export async function deleteCategory(
  id: string,
): Promise<{ success: boolean }> {
  await delay(400);
  const categoryIndex = mockCategories.findIndex((c) => c.id === id);
  if (categoryIndex === -1) {
    throw new Error("Category not found");
  }
  mockCategories.splice(categoryIndex, 1);
  return { success: true };
}

export async function getPostById(id: string): Promise<Post | null> {
  await delay(300);
  return mockPosts.find((post) => post.id === id) || null;
}

export interface PostComment {
  id: string;
  postId: string;
  userName: string;
  userAvatar: string;
  userEmail: string;
  comment: string;
  createdAt: string;
  updatedAt?: string;
  likes: number;
  replies?: PostComment[];
}

const mockComments: Record<string, PostComment[]> = {
  "1": [
    {
      id: "c1",
      postId: "1",
      userName: "Alex Thompson",
      userAvatar: "",
      userEmail: "diwashb999@gmail.com",
      comment:
        "Great review! I've been considering getting this controller. The haptic feedback sounds amazing. How does it compare to the previous generation?",
      createdAt: "2021-06-08T10:30:00Z",
      likes: 24,
    },
    {
      id: "c2",
      postId: "1",
      userName: "Sarah Chen",
      userAvatar: "",
      userEmail: "diwashb999@gmail.com",
      comment:
        "I've had this controller for a few months now and I can confirm the adaptive triggers are game-changing. Especially in racing games!",
      createdAt: "2021-06-08T14:15:00Z",
      likes: 18,
      replies: [
        {
          id: "c2r1",
          postId: "1",
          userName: "John Doe",
          userAvatar: "",
          userEmail: "john@example.com",
          comment:
            "Totally agree! The resistance when braking feels so realistic.",
          createdAt: "2021-06-08T15:00:00Z",
          likes: 5,
        },
      ],
    },
    {
      id: "c3",
      postId: "1",
      userName: "Mike Rodriguez",
      userAvatar: "",
      userEmail: "mike@example.com",
      comment:
        "The battery life is impressive. I can game for hours without worrying about charging. Definitely worth the investment!",
      createdAt: "2021-06-09T09:20:00Z",
      likes: 12,
    },
    {
      id: "c4",
      postId: "1",
      userName: "Emily Watson",
      userAvatar: "",
      userEmail: "emily@example.com",
      comment:
        "Thanks for the detailed review! I'm particularly interested in how it works with PC games. Have you tested that?",
      createdAt: "2021-06-09T16:45:00Z",
      likes: 8,
    },
  ],
  "2": [
    {
      id: "c5",
      postId: "2",
      userName: "David Kim",
      userAvatar: "",
      userEmail: "david@example.com",
      comment:
        "The new multitasking features in iPadOS 15 are exactly what I needed for my workflow. Great overview!",
      createdAt: "2021-06-09T11:00:00Z",
      likes: 15,
    },
    {
      id: "c6",
      postId: "2",
      userName: "Lisa Park",
      userAvatar: "",
      userEmail: "lisa@example.com",
      comment:
        "I'm excited about the Quick Note feature. It's going to make note-taking so much more convenient.",
      createdAt: "2021-06-09T13:30:00Z",
      likes: 9,
    },
  ],
  "3": [
    {
      id: "c7",
      postId: "3",
      userName: "Chris Anderson",
      userAvatar: "",
      userEmail: "chris@example.com",
      comment:
        "These React best practices are spot on! I've been implementing them in my projects and the code quality has improved significantly.",
      createdAt: "2021-06-11T10:00:00Z",
      likes: 22,
    },
    {
      id: "c8",
      postId: "3",
      userName: "Jessica Martinez",
      userAvatar: "",
      userEmail: "jessica@example.com",
      comment:
        "Could you elaborate more on the state management patterns? I'm still learning React and would love more examples.",
      createdAt: "2021-06-11T14:20:00Z",
      likes: 6,
    },
  ],
};

export async function getPostComments(postId: string): Promise<PostComment[]> {
  await delay(400);
  return mockComments[postId] || [];
}

export async function deletePost(
  postId: string,
): Promise<{ success: boolean }> {
  await delay(500);
  // In a real app, this would make an API call
  // For mock, we'll just simulate success
  return { success: true };
}

export interface UpdatePostData {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string;
  status: "published" | "draft" | "archived";
  featured: boolean;
}

export async function updatePost(
  postId: string,
  data: UpdatePostData,
): Promise<Post> {
  await delay(500);
  // In a real app, this would make an API call
  // For mock, we'll update the post in the array
  const postIndex = mockPosts.findIndex((p) => p.id === postId);
  if (postIndex === -1) {
    throw new Error("Post not found");
  }

  const tagsArray = data.tags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  const updatedPost: Post = {
    ...mockPosts[postIndex],
    title: data.title,
    excerpt: data.excerpt,
    content: data.content,
    category: data.category,
    tags: tagsArray,
    status: data.status,
    featured: data.featured,
    updatedAt: new Date().toISOString().split("T")[0],
  };

  mockPosts[postIndex] = updatedPost;
  return updatedPost;
}

export async function deleteComment(
  postId: string,
  commentId: string,
): Promise<{ success: boolean }> {
  await delay(400);
  // In a real app, this would make an API call
  // For mock, we'll just simulate success
  if (mockComments[postId]) {
    const removeComment = (comments: PostComment[]): PostComment[] => {
      return comments
        .filter((c) => c.id !== commentId)
        .map((c) => ({
          ...c,
          replies: c.replies ? removeComment(c.replies) : undefined,
        }));
    };
    mockComments[postId] = removeComment(mockComments[postId]);
  }
  return { success: true };
}
