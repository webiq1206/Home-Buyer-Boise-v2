import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, ChevronRight, Search, BookOpen, TrendingUp, Home, Scale, Users, ArrowRight } from "lucide-react";
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
        {/* Hero Section - Brand Blue Gradient */}
        <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-center overflow-hidden bg-gradient-to-br from-[#0E4DA4] to-[#1F3D5C]">
          <div className="absolute inset-0 overflow-hidden">
            <img 
              src={heroBackground} 
              alt="" 
              className="absolute inset-0 w-full h-full object-cover opacity-60"
              width={1920}
              height={1080}
              loading="eager"
              style={{ objectPosition: 'center 40%' }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0E4DA4]/70 via-[#0E4DA4]/40 to-[#0E4DA4]/80" />
          
          <div className="container relative z-10 py-20 md:py-28">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-[#D4A12A]/20 text-[#D4A12A] border-[#D4A12A]/40 text-sm px-4 py-1" data-testid="badge-blog-hero">
                Expert Insights
              </Badge>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-white tracking-tight" data-testid="text-blog-title">
                Cash Home Buying{" "}
                <span className="text-[#D4A12A]">Resources</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
                Your comprehensive guide to selling your house fast for cash in the Boise metro area. 
                Expert advice from Idaho's trusted cash home buyers.
              </p>

              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-6 w-6 text-white/60" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-14 h-16 text-lg bg-white/15 border-white/30 text-white placeholder:text-white/50 focus:bg-white/25 focus:border-[#D4A12A] rounded-xl"
                  data-testid="input-blog-search"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="border-b bg-[#EFF5FA]">
          <div className="container py-6">
            <div className="flex flex-wrap gap-3 justify-center">
              {CATEGORIES.map((category) => (
                <Button
                  key={category.value}
                  variant={selectedCategory === category.value ? "default" : "outline"}
                  size="default"
                  onClick={() => setSelectedCategory(category.value)}
                  className={selectedCategory === category.value 
                    ? "bg-[#0E4DA4] hover:bg-[#0E4DA4]/90 text-white" 
                    : "border-[#0E4DA4]/30 text-[#0E4DA4] hover:bg-[#0E4DA4]/10"
                  }
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
        <section className="py-20 md:py-28">
          <div className="container">
            {isLoading ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="h-48 bg-[#EFF5FA] rounded-t-lg" />
                    <CardHeader>
                      <div className="h-4 bg-[#EFF5FA] rounded w-1/4 mb-2" />
                      <div className="h-6 bg-[#EFF5FA] rounded w-3/4" />
                    </CardHeader>
                    <CardContent>
                      <div className="h-4 bg-[#EFF5FA] rounded w-full mb-2" />
                      <div className="h-4 bg-[#EFF5FA] rounded w-2/3" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="text-center py-16">
                <BookOpen className="h-16 w-16 mx-auto text-[#0E4DA4]/30 mb-6" />
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
                    <Card className="mb-16 overflow-hidden hover-elevate cursor-pointer group border-2 border-transparent hover:border-[#D4A12A]/30" data-testid="card-featured-post">
                      <div className="grid md:grid-cols-2 gap-0">
                        <div className="bg-gradient-to-br from-[#0E4DA4] to-[#1F3D5C] p-10 md:p-14 flex items-center justify-center min-h-[280px]">
                          <div className="text-center">
                            <Badge className="bg-[#D4A12A]/20 text-[#D4A12A] border-[#D4A12A]/40 mb-6 text-sm">
                              Featured Article
                            </Badge>
                            <Home className="h-24 w-24 text-white/70 mx-auto" />
                          </div>
                        </div>
                        <div className="p-10 md:p-14 flex flex-col justify-center">
                          <Badge variant="secondary" className="mb-5 w-fit bg-[#EFF5FA] text-[#0E4DA4]">
                            {filteredPosts[0].category}
                          </Badge>
                          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-5 group-hover:text-[#0E4DA4] transition-colors leading-tight">
                            {filteredPosts[0].title}
                          </h2>
                          <p className="text-muted-foreground text-lg mb-6 line-clamp-3 leading-relaxed">
                            {filteredPosts[0].excerpt}
                          </p>
                          <div className="flex items-center gap-6 text-sm text-muted-foreground">
                            <span className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-[#0E4DA4]" />
                              {formatDate(filteredPosts[0].publishedAt)}
                            </span>
                            <span className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-[#0E4DA4]" />
                              {estimateReadTime(filteredPosts[0].excerpt)} min read
                            </span>
                          </div>
                          <div className="mt-6 flex items-center text-[#0E4DA4] font-semibold group-hover:text-[#D4A12A] transition-colors">
                            Read Article <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                )}

                {/* Rest of Posts */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {filteredPosts.slice(1).map((post) => (
                    <Link key={post.id} href={`/blog/${post.slug}`}>
                      <Card className="h-full hover-elevate cursor-pointer group border-2 border-transparent hover:border-[#D4A12A]/30" data-testid={`card-post-${post.slug}`}>
                        <div className="h-40 bg-gradient-to-br from-[#EFF5FA] to-[#d6e6f5] flex items-center justify-center">
                          <Home className="h-14 w-14 text-[#0E4DA4]/30 group-hover:text-[#0E4DA4]/50 transition-colors" />
                        </div>
                        <CardHeader className="pb-3">
                          <Badge variant="outline" className="w-fit mb-3 text-xs border-[#0E4DA4]/30 text-[#0E4DA4]">
                            {post.category}
                          </Badge>
                          <CardTitle className="text-xl group-hover:text-[#0E4DA4] transition-colors line-clamp-2 leading-tight">
                            {post.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="line-clamp-2 mb-5 text-base leading-relaxed">
                            {post.excerpt}
                          </CardDescription>
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              {formatDate(post.publishedAt)}
                            </span>
                            <span className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
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

        {/* CTA Section - Brand Blue */}
        <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-br from-[#0E4DA4] to-[#1F3D5C]">
          <div className="absolute inset-0 overflow-hidden">
            <img 
              src={ctaBackground} 
              alt="" 
              className="absolute inset-0 w-full h-full object-cover opacity-50"
              width={1920}
              height={1080}
              loading="lazy"
              style={{ objectPosition: 'center center' }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0E4DA4]/60 via-[#0E4DA4]/30 to-[#0E4DA4]/70" />
          
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Ready to Sell Your House Fast?</h2>
              <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed">
                Get a no-obligation cash offer on your Boise area home in as little as 24 hours. 
                No repairs, no fees, no hassle.
              </p>
              <Link href="/get-quote">
                <Button size="lg" className="bg-[#D4A12A] hover:bg-[#D4A12A]/90 text-white text-lg px-10 py-6 h-auto" data-testid="button-blog-cta">
                  Get Your Cash Offer
                  <ChevronRight className="ml-2 h-6 w-6" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
