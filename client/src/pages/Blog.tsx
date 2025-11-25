import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, ChevronRight, Search, BookOpen, TrendingUp, Home, Scale, Users } from "lucide-react";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  category: string;
  tags: string[];
  publishedAt: string;
}

const CATEGORIES = [
  { name: "All Posts", icon: BookOpen, value: "" },
  { name: "Selling Fast", icon: TrendingUp, value: "Selling Fast" },
  { name: "Property Issues", icon: Home, value: "Property Issues" },
  { name: "Legal & Financial", icon: Scale, value: "Legal & Financial" },
  { name: "Life Situations", icon: Users, value: "Life Situations" },
];

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const { data: posts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory =
      selectedCategory === "" || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const estimateReadTime = (excerpt: string) => {
    const wordsPerMinute = 200;
    const wordCount = excerpt.split(" ").length * 10;
    return Math.max(5, Math.ceil(wordCount / wordsPerMinute));
  };

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "HomeBuyerBoise Blog",
    "description": "Expert guides on selling your house fast for cash in Boise, Idaho. Learn about cash offers, avoiding foreclosure, selling as-is, and more.",
    "url": "https://homebuyerboise.com/blog",
    "publisher": {
      "@type": "Organization",
      "name": "HomeBuyerBoise",
      "logo": {
        "@type": "ImageObject",
        "url": "https://homebuyerboise.com/logo.png"
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Cash Home Buying Blog | Expert Guides | HomeBuyerBoise</title>
        <meta
          name="description"
          content="Expert guides on selling your house fast for cash in Boise, Idaho. Learn about cash offers, avoiding foreclosure, selling inherited homes, and more from local experts."
        />
        <meta name="keywords" content="sell house fast Boise, cash home buyer Idaho, sell house as-is, avoid foreclosure Boise, inherited property sale" />
        <link rel="canonical" href="https://homebuyerboise.com/blog" />
        
        <meta property="og:title" content="Cash Home Buying Blog | HomeBuyerBoise" />
        <meta property="og:description" content="Expert guides on selling your house fast for cash in Boise, Idaho." />
        <meta property="og:url" content="https://homebuyerboise.com/blog" />
        <meta property="og:type" content="website" />
        
        <script type="application/ld+json">{JSON.stringify(blogSchema)}</script>
      </Helmet>

      <div className="min-h-screen bg-background" data-testid="page-blog">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYtMi42ODYgNi02cy0yLjY4Ni02LTYtNi02IDIuNjg2LTYgNiAyLjY4NiA2IDYgNnoiIHN0cm9rZT0icmdiYSgyMDAsIDE3MCwgMTAwLCAwLjEpIiBzdHJva2Utd2lkdGg9IjIiLz48L2c+PC9zdmc+')] opacity-20"></div>
          
          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-4 bg-amber-500/20 text-amber-300 border-amber-500/30" data-testid="badge-blog-hero">
                Expert Insights
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-blog-title">
                Cash Home Buying <span className="text-amber-400">Resources</span>
              </h1>
              <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
                Your comprehensive guide to selling your house fast for cash in the Boise metro area. 
                Expert advice from Idaho's trusted cash home buyers.
              </p>

              {/* Search Bar */}
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:bg-white/20"
                  data-testid="input-blog-search"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="border-b bg-slate-50 dark:bg-slate-900/50">
          <div className="container py-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {CATEGORIES.map((category) => (
                <Button
                  key={category.value}
                  variant={selectedCategory === category.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.value)}
                  className={selectedCategory === category.value ? "bg-amber-600 hover:bg-amber-700" : ""}
                  data-testid={`button-category-${category.value || "all"}`}
                >
                  <category.icon className="h-4 w-4 mr-2" />
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16">
          <div className="container">
            {isLoading ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="h-48 bg-slate-200 dark:bg-slate-800 rounded-t-lg" />
                    <CardHeader>
                      <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/4 mb-2" />
                      <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
                    </CardHeader>
                    <CardContent>
                      <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full mb-2" />
                      <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-2/3" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No articles found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or category filter
                </p>
              </div>
            ) : (
              <>
                {/* Featured Post - First Post */}
                {filteredPosts.length > 0 && (
                  <Link href={`/blog/${filteredPosts[0].slug}`}>
                    <Card className="mb-12 overflow-hidden hover-elevate cursor-pointer group" data-testid="card-featured-post">
                      <div className="grid md:grid-cols-2 gap-0">
                        <div className="bg-gradient-to-br from-amber-500 to-amber-700 p-8 md:p-12 flex items-center justify-center">
                          <div className="text-center">
                            <Badge className="bg-white/20 text-white border-white/30 mb-4">
                              Featured Article
                            </Badge>
                            <Home className="h-20 w-20 text-white/80 mx-auto" />
                          </div>
                        </div>
                        <div className="p-8 md:p-12">
                          <Badge variant="secondary" className="mb-4">
                            {filteredPosts[0].category}
                          </Badge>
                          <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-amber-600 transition-colors">
                            {filteredPosts[0].title}
                          </h2>
                          <p className="text-muted-foreground mb-6 line-clamp-3">
                            {filteredPosts[0].excerpt}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {formatDate(filteredPosts[0].publishedAt)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {estimateReadTime(filteredPosts[0].excerpt)} min read
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                )}

                {/* Rest of Posts */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredPosts.slice(1).map((post) => (
                    <Link key={post.id} href={`/blog/${post.slug}`}>
                      <Card className="h-full hover-elevate cursor-pointer group" data-testid={`card-post-${post.slug}`}>
                        <div className="h-32 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center">
                          <Home className="h-12 w-12 text-amber-500/50" />
                        </div>
                        <CardHeader className="pb-2">
                          <Badge variant="outline" className="w-fit mb-2 text-xs">
                            {post.category}
                          </Badge>
                          <CardTitle className="text-lg group-hover:text-amber-600 transition-colors line-clamp-2">
                            {post.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="line-clamp-2 mb-4">
                            {post.excerpt}
                          </CardDescription>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDate(post.publishedAt)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {estimateReadTime(post.excerpt)} min
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-amber-500 to-amber-600">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-4">Ready to Sell Your House Fast?</h2>
              <p className="text-lg text-amber-100 mb-8">
                Get a no-obligation cash offer on your Boise area home in as little as 24 hours. 
                No repairs, no fees, no hassle.
              </p>
              <Link href="/get-quote">
                <Button size="lg" variant="secondary" className="text-amber-600 hover:text-amber-700" data-testid="button-blog-cta">
                  Get Your Cash Offer
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
