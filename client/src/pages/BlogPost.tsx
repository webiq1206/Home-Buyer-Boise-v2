import { useQuery } from "@tanstack/react-query";
import { Link, useRoute } from "wouter";
import { Helmet } from "react-helmet-async";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Calendar, Clock, ChevronLeft, ChevronRight, Share2, Home, Phone, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BlogPostData {
  id: string;
  slug: string;
  title: string;
  seoTitle?: string;
  metaDescription?: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  publishedAt: string;
  faqs?: Array<{ question: string; answer: string }>;
}

export default function BlogPost() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug;
  const { toast } = useToast();

  const { data: post, isLoading, error } = useQuery<BlogPostData>({
    queryKey: ["/api/blog", slug],
    enabled: !!slug,
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const estimateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const text = content.replace(/<[^>]*>/g, " ");
    const wordCount = text.split(/\s+/).length;
    return Math.max(5, Math.ceil(wordCount / wordsPerMinute));
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({
        title: post?.title,
        url,
      });
    } else {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Link Copied",
        description: "Article link copied to clipboard",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container py-12">
          <div className="max-w-4xl mx-auto animate-pulse">
            <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-3/4 mb-4" />
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2 mb-8" />
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-4 bg-slate-200 dark:bg-slate-800 rounded" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The article you're looking for doesn't exist or has been moved.
            </p>
            <Link href="/blog">
              <Button>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.seoTitle || post.title,
    "description": post.metaDescription || post.excerpt,
    "author": {
      "@type": "Organization",
      "name": post.author,
      "url": "https://homebuyerboise.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "HomeBuyerBoise",
      "logo": {
        "@type": "ImageObject",
        "url": "https://homebuyerboise.com/logo.png"
      }
    },
    "datePublished": post.publishedAt,
    "dateModified": post.publishedAt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://homebuyerboise.com/blog/${post.slug}`
    },
    "keywords": post.tags.join(", ")
  };

  const faqSchema = post.faqs && post.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": post.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://homebuyerboise.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://homebuyerboise.com/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `https://homebuyerboise.com/blog/${post.slug}`
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>{post.seoTitle || post.title} | HomeBuyerBoise</title>
        <meta name="description" content={post.metaDescription || post.excerpt} />
        <meta name="keywords" content={post.tags.join(", ")} />
        <link rel="canonical" href={`https://homebuyerboise.com/blog/${post.slug}`} />
        
        <meta property="og:title" content={post.seoTitle || post.title} />
        <meta property="og:description" content={post.metaDescription || post.excerpt} />
        <meta property="og:url" content={`https://homebuyerboise.com/blog/${post.slug}`} />
        <meta property="og:type" content="article" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.seoTitle || post.title} />
        <meta name="twitter:description" content={post.metaDescription || post.excerpt} />
        
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        {faqSchema && <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>}
      </Helmet>

      <article className="min-h-screen bg-background" data-testid="page-blog-post">
        {/* Hero Section */}
        <header className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYtMi42ODYgNi02cy0yLjY4Ni02LTYtNi02IDIuNjg2LTYgNiAyLjY4NiA2IDYgNnoiIHN0cm9rZT0icmdiYSgyMDAsIDE3MCwgMTAwLCAwLjEpIiBzdHJva2Utd2lkdGg9IjIiLz48L2c+PC9zdmc+')] opacity-20"></div>
          
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-300 truncate max-w-xs">{post.title}</span>
              </nav>

              <Badge className="mb-4 bg-amber-500/20 text-amber-300 border-amber-500/30">
                {post.category}
              </Badge>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight" data-testid="text-post-title">
                {post.title}
              </h1>
              
              <p className="text-lg text-slate-300 mb-8 max-w-3xl">
                {post.excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {formatDate(post.publishedAt)}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {estimateReadTime(post.content)} min read
                </span>
                <span className="text-slate-300">
                  By {post.author}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-slate-400 hover:text-white"
                  onClick={handleShare}
                  data-testid="button-share"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="container py-12">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-12">
              {/* Sidebar - Table of Contents for larger screens */}
              <aside className="hidden lg:block lg:col-span-1">
                <div className="sticky top-24">
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-3 text-sm">Quick Links</h3>
                      <div className="space-y-2 text-sm">
                        <Link href="/get-quote" className="block text-amber-600 hover:text-amber-700 font-medium">
                          Get Your Cash Offer
                        </Link>
                        <Link href="/how-it-works" className="block text-muted-foreground hover:text-foreground">
                          How It Works
                        </Link>
                        <Link href="/about" className="block text-muted-foreground hover:text-foreground">
                          About Us
                        </Link>
                      </div>
                      
                      <div className="border-t mt-4 pt-4">
                        <p className="text-xs text-muted-foreground mb-2">Tags</p>
                        <div className="flex flex-wrap gap-1">
                          {post.tags.slice(0, 5).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </aside>

              {/* Article Content */}
              <div className="lg:col-span-3">
                {/* Article Body */}
                <div 
                  className="prose prose-lg dark:prose-invert max-w-none
                    prose-headings:font-bold prose-headings:text-foreground
                    prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-3 prose-h2:border-b prose-h2:border-amber-200 dark:prose-h2:border-amber-900
                    prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
                    prose-h4:text-lg prose-h4:mt-6 prose-h4:mb-3
                    prose-p:text-muted-foreground prose-p:leading-relaxed
                    prose-a:text-amber-600 prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-foreground
                    prose-ul:my-6 prose-li:text-muted-foreground
                    prose-ol:my-6
                    prose-blockquote:border-l-amber-500 prose-blockquote:bg-amber-50 dark:prose-blockquote:bg-amber-950/30 prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
                    prose-table:border prose-table:border-border prose-th:bg-muted prose-th:p-3 prose-td:p-3 prose-td:border-t"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                  data-testid="content-post-body"
                />

                {/* FAQ Section */}
                {post.faqs && post.faqs.length > 0 && (
                  <section className="mt-16 pt-8 border-t">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                      <span className="w-1 h-8 bg-amber-500 rounded-full"></span>
                      Frequently Asked Questions
                    </h2>
                    <Accordion type="single" collapsible className="space-y-4">
                      {post.faqs.map((faq, index) => (
                        <AccordionItem 
                          key={index} 
                          value={`faq-${index}`}
                          className="border rounded-lg px-4 data-[state=open]:bg-amber-50 dark:data-[state=open]:bg-amber-950/20"
                        >
                          <AccordionTrigger className="text-left font-medium hover:no-underline" data-testid={`accordion-faq-${index}`}>
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </section>
                )}

                {/* CTA Section */}
                <section className="mt-16">
                  <Card className="bg-gradient-to-br from-amber-500 to-amber-600 text-white border-0 overflow-hidden">
                    <CardContent className="p-8 md:p-12">
                      <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-shrink-0">
                          <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
                            <Home className="h-10 w-10" />
                          </div>
                        </div>
                        <div className="flex-1 text-center md:text-left">
                          <h3 className="text-2xl md:text-3xl font-bold mb-3">
                            Ready to Sell Your House Fast?
                          </h3>
                          <p className="text-amber-100 mb-6">
                            Get a fair, no-obligation cash offer on your Boise area home today. 
                            We buy houses in any condition - no repairs, no fees, no hassle.
                          </p>
                          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <Link href="/get-quote">
                              <Button size="lg" variant="secondary" className="w-full sm:w-auto text-amber-600 hover:text-amber-700" data-testid="button-cta-quote">
                                Get Your Cash Offer
                                <ChevronRight className="ml-2 h-5 w-5" />
                              </Button>
                            </Link>
                            <Link href="tel:208-314-2458">
                              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/50 text-white hover:bg-white/10" data-testid="button-cta-call">
                                <Phone className="mr-2 h-5 w-5" />
                                (208) 314-2458
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>

                      {/* Trust Indicators */}
                      <div className="mt-8 pt-6 border-t border-white/20">
                        <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm text-amber-100">
                          <span className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4" />
                            No Fees or Commissions
                          </span>
                          <span className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4" />
                            Close in 7-14 Days
                          </span>
                          <span className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4" />
                            We Buy As-Is
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </section>

                {/* Back to Blog */}
                <div className="mt-12 pt-8 border-t">
                  <Link href="/blog">
                    <Button variant="outline">
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Back to All Articles
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
