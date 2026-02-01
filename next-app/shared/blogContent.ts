// Blog Content Data for Home Buyer Boise
// Re-export from the original shared folder to maintain single source of truth
// 57 SEO-optimized blog posts for cash home buying in the Boise metro area

export interface BlogPostData {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  publishedAt: string;
  faqs: Array<{question: string; answer: string}>;
}

// Import from the parent shared directory
// Note: This file structure allows the Next.js app to access the original blog content
export { BLOG_POSTS } from '../../shared/blogContent';

// Helper functions for blog posts
export function getBlogPostBySlug(slug: string): BlogPostData | undefined {
  // Dynamic import to avoid loading all posts at build time for static paths
  const { BLOG_POSTS } = require('../../shared/blogContent');
  return BLOG_POSTS.find((post: BlogPostData) => post.slug === slug);
}

export function getAllBlogSlugs(): string[] {
  const { BLOG_POSTS } = require('../../shared/blogContent');
  return BLOG_POSTS.map((post: BlogPostData) => post.slug);
}

export function getBlogPostsByCategory(category: string): BlogPostData[] {
  const { BLOG_POSTS } = require('../../shared/blogContent');
  return BLOG_POSTS.filter((post: BlogPostData) => post.category === category);
}

export function getAllBlogCategories(): string[] {
  const { BLOG_POSTS } = require('../../shared/blogContent');
  const categories = BLOG_POSTS.map((post: BlogPostData) => post.category);
  return Array.from(new Set(categories)) as string[];
}

export function getRecentBlogPosts(count: number = 6): BlogPostData[] {
  const { BLOG_POSTS } = require('../../shared/blogContent');
  return [...BLOG_POSTS]
    .sort((a: BlogPostData, b: BlogPostData) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, count);
}
