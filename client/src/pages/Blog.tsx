import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, Search, BookOpen, TrendingUp, Home, Scale, Users, ArrowRight } from "lucide-react";
import heroBackground from "@assets/Stars (2)_1764090286439.png";
import ctaBackground from "@assets/Smiley Face_1764090286439.png";

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
    "name": "Home Buyer Boise Blog",
    "description": "Expert guides on selling your house fast for cash in Boise, Idaho. Learn about cash offers, avoiding foreclosure, selling as-is, and more.",
    "url": "https://homebuyerboise.com/blog",
    "publisher": {
      "@type": "Organization",
      "name": "Home Buyer Boise",
      "logo": {
        "@type": "ImageObject",
        "url": "https://homebuyerboise.com/logo.png"
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Cash Home Buying Blog | Expert Guides | Home Buyer Boise</title>
        <meta
          name="description"
          content="Expert guides on selling your house fast for cash in Boise, Idaho. Learn about cash offers, avoiding foreclosure, selling inherited homes, and more from local experts."
        />
        <meta name="keywords" content="sell house fast Boise, cash home buyer Idaho, sell house as-is, avoid foreclosure Boise, inherited property sale" />
        <link rel="canonical" href="https://homebuyerboise.com/blog" />
        
        <meta property="og:title" content="Cash Home Buying Blog | Home Buyer Boise" />
        <meta property="og:description" content="Expert guides on selling your house fast for cash in Boise, Idaho." />
        <meta property="og:url" content="https://homebuyerboise.com/blog" />
        <meta property="og:type" content="website" />
        
        <script type="application/ld+json">{JSON.stringify(blogSchema)}</script>
      </Helmet>

      <div className="flex flex-col pb-20" data-testid="page-blog">
        {/* Hero Section - Matches Homepage Pattern */}
        <section className="relative py-24 md:py-32 lg:py-40 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src={heroBackground} 
              alt=""
              className="w-full h-full object-cover"
              width="1920"
              height="1080"
              loading="eager"
            />
          </div>
          
          {/* Dark Overlay to ensure text readability */}
          <div className="absolute inset-0 z-[1] bg-gradient-to-br from-primary/70 via-primary/65 to-primary/60"></div>
          
          <div className="container px-4 md:px-8 relative z-10">
            <div className="max-w-7xl mx-auto">
              <div className="text-center lg:text-left space-y-6 md:space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                <BookOpen className="h-4 w-4 text-white" />
                <span className="text-sm font-medium text-white">Expert Insights & Guides</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight" data-testid="text-blog-title">
                Cash Home Buying
                <br />
                <span className="text-accent">Resources</span>
              </h1>
              
              <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto lg:mx-0">
                Your comprehensive guide to selling your house fast for cash in the Boise metro area. 
                Expert advice from Idaho's trusted cash home buyers.
              </p>

              {/* Search Bar */}
              <div className="relative max-w-xl mx-auto lg:mx-0 pt-4">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 mt-2 h-5 w-5 text-white/60" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/50 focus:bg-white/20 focus:border-accent"
                  data-testid="input-blog-search"
                />
              </div>
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="border-b bg-muted">
          <div className="container px-4 md:px-8 py-6">
            <div className="flex flex-wrap gap-3 justify-center">
              {CATEGORIES.map((category) => (
                <Button
                  key={category.value}
                  variant={selectedCategory === category.value ? "default" : "outline"}
                  size="default"
                  onClick={() => setSelectedCategory(category.value)}
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
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
              {isLoading ? (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Card key={i} className="animate-pulse">
                      <div className="h-48 bg-muted rounded-t-lg" />
                      <CardHeader>
                        <div className="h-4 bg-muted rounded w-1/4 mb-2" />
                        <div className="h-6 bg-muted rounded w-3/4" />
                      </CardHeader>
                      <CardContent>
                        <div className="h-4 bg-muted rounded w-full mb-2" />
                        <div className="h-4 bg-muted rounded w-2/3" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : filteredPosts.length === 0 ? (
                <div className="text-center py-16">
                  <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-6" />
                  <h3 className="text-2xl font-bold mb-3">No articles found</h3>
                  <p className="text-muted-foreground text-lg">
                    Try adjusting your search or category filter
                  </p>
                </div>
              ) : (
                <>
                  {/* Featured Post - First Post */}
                  {filteredPosts.length > 0 && (
                    <Link href={`/blog/${filteredPosts[0].slug}`}>
                      <Card className="mb-12 overflow-hidden hover-elevate cursor-pointer group border-l-4 border-l-primary" data-testid="card-featured-post">
                        <div className="p-8 md:p-10">
                          <div className="flex flex-wrap items-center gap-3 mb-4">
                            <Badge variant="default" className="bg-primary">
                              Featured
                            </Badge>
                            <Badge variant="secondary">
                              {filteredPosts[0].category}
                            </Badge>
                          </div>
                          <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary transition-colors leading-tight tracking-tight">
                            {filteredPosts[0].title}
                          </h2>
                          <p className="text-muted-foreground text-lg mb-6 line-clamp-3 leading-relaxed">
                            {filteredPosts[0].excerpt}
                          </p>
                          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                            <span className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-primary" />
                              {formatDate(filteredPosts[0].publishedAt)}
                            </span>
                            <span className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-primary" />
                              {estimateReadTime(filteredPosts[0].excerpt)} min read
                            </span>
                            <span className="flex items-center text-primary font-semibold group-hover:text-accent transition-colors ml-auto">
                              Read Article <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </span>
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
                          <CardHeader className="pb-3">
                            <Badge variant="outline" className="w-fit mb-2 text-xs">
                              {post.category}
                            </Badge>
                            <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2 leading-tight tracking-tight">
                              {post.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <CardDescription className="line-clamp-3 mb-4 text-sm leading-relaxed">
                              {post.excerpt}
                            </CardDescription>
                            <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                              <span className="flex items-center gap-1.5">
                                <Calendar className="h-3.5 w-3.5" />
                                {formatDate(post.publishedAt)}
                              </span>
                              <span className="flex items-center gap-1.5">
                                <Clock className="h-3.5 w-3.5" />
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
          </div>
        </section>

        {/* CTA Section - Matches Homepage Pattern */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-8">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Ready to Sell Your House Fast?
              </h2>
              <p className="text-xl text-primary-foreground leading-relaxed">
                Get a no-obligation cash offer on your Boise area home in as little as 24 hours. 
                No repairs, no fees, no hassle.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button size="lg" variant="secondary" asChild data-testid="button-blog-cta">
                  <Link href="/get-quote">
                    Get Your Cash Offer
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" 
                  asChild
                >
                  <Link href="/how-it-works">
                    How It Works
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
