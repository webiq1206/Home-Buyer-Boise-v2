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
import { Calendar, Clock, ChevronLeft, ChevronRight, Share2, Home, Phone, CheckCircle, ArrowRight, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import heroBackground from "@assets/Exclamation Points_1764090286437.png";

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
      <div className="flex flex-col pb-20">
        <div className="container px-4 md:px-8 py-20">
          <div className="max-w-4xl mx-auto animate-pulse">
            <div className="h-10 bg-muted rounded w-3/4 mb-6" />
            <div className="h-6 bg-muted rounded w-1/2 mb-12" />
            <div className="space-y-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-5 bg-muted rounded" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex flex-col pb-20">
        <div className="container px-4 md:px-8 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6 tracking-tight">Article Not Found</h1>
            <p className="text-muted-foreground text-lg mb-10">
              The article you're looking for doesn't exist or has been moved.
            </p>
            <Button size="lg" asChild>
              <Link href="/blog">
                <ChevronLeft className="mr-2 h-5 w-5" />
                Back to Blog
              </Link>
            </Button>
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

      <article className="flex flex-col pb-20" data-testid="page-blog-post">
        {/* Hero Section - Matches Homepage Pattern */}
        <header className="relative py-24 md:py-32 lg:py-40 overflow-hidden">
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
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-sm text-white/70 mb-8" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-white/90 truncate max-w-xs">{post.category}</span>
              </nav>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                <BookOpen className="h-4 w-4 text-white" />
                <span className="text-sm font-medium text-white">{post.category}</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight mb-6" data-testid="text-post-title">
                {post.title}
              </h1>
              
              <p className="text-lg md:text-xl text-white/90 max-w-3xl mb-8 leading-relaxed">
                {post.excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-base text-white/80">
                <span className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-accent" />
                  {formatDate(post.publishedAt)}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-accent" />
                  {estimateReadTime(post.content)} min read
                </span>
                <span className="text-white">
                  By {post.author}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white/80 hover:text-white hover:bg-white/10"
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
        <div className="container px-4 md:px-8 py-16 md:py-24">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-12">
              {/* Sidebar - Quick Links for larger screens */}
              <aside className="hidden lg:block lg:col-span-1">
                <div className="sticky top-24">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-bold mb-4 text-primary">Quick Links</h3>
                      <div className="space-y-3">
                        <Link href="/get-quote" className="flex items-center gap-2 text-accent hover:text-accent/80 font-semibold transition-colors">
                          <ArrowRight className="h-4 w-4" />
                          Get Your Cash Offer
                        </Link>
                        <Link href="/how-it-works" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                          <ArrowRight className="h-4 w-4" />
                          How It Works
                        </Link>
                        <Link href="/about" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                          <ArrowRight className="h-4 w-4" />
                          About Us
                        </Link>
                      </div>
                      
                      <div className="border-t mt-6 pt-6">
                        <p className="text-sm font-semibold text-primary mb-3">Tags</p>
                        <div className="flex flex-wrap gap-2">
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
                    prose-headings:font-bold prose-headings:text-foreground prose-headings:tracking-tight
                    prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-4 prose-h2:border-b
                    prose-h3:text-xl prose-h3:md:text-2xl prose-h3:mt-10 prose-h3:mb-5
                    prose-h4:text-lg prose-h4:md:text-xl prose-h4:mt-8 prose-h4:mb-4
                    prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:text-base prose-p:md:text-lg
                    prose-a:text-primary prose-a:font-medium prose-a:no-underline hover:prose-a:underline hover:prose-a:text-accent
                    prose-strong:text-foreground prose-strong:font-bold
                    prose-ul:my-6 prose-li:text-muted-foreground prose-li:text-base prose-li:md:text-lg
                    prose-ol:my-6
                    prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:bg-muted prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
                    prose-table:border prose-table:border-border prose-th:bg-muted prose-th:p-4 prose-td:p-4 prose-td:border-t"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                  data-testid="content-post-body"
                />

                {/* FAQ Section */}
                {post.faqs && post.faqs.length > 0 && (
                  <section className="mt-16 pt-8 border-t">
                    <h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-4 tracking-tight">
                      <span className="w-1.5 h-10 bg-accent rounded-full"></span>
                      Frequently Asked Questions
                    </h2>
                    <Accordion type="single" collapsible className="space-y-4">
                      {post.faqs.map((faq, index) => (
                        <AccordionItem 
                          key={index} 
                          value={`faq-${index}`}
                          className="border rounded-lg px-6 data-[state=open]:bg-muted"
                        >
                          <AccordionTrigger className="text-left font-semibold text-base md:text-lg hover:no-underline py-5" data-testid={`accordion-faq-${index}`}>
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-5">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </section>
                )}

                {/* CTA Section - Matches Homepage Pattern */}
                <section className="mt-16">
                  <Card className="bg-primary text-primary-foreground border-0 overflow-hidden">
                    <CardContent className="p-8 md:p-12">
                      <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-shrink-0">
                          <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
                            <Home className="h-10 w-10" />
                          </div>
                        </div>
                        <div className="flex-1 text-center md:text-left">
                          <h3 className="text-2xl md:text-3xl font-bold mb-3 tracking-tight">
                            Ready to Sell Your House Fast?
                          </h3>
                          <p className="text-primary-foreground/90 text-lg mb-6 leading-relaxed">
                            Get a fair, no-obligation cash offer on your Boise area home today. 
                            We buy houses in any condition - no repairs, no fees, no hassle.
                          </p>
                          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <Button size="lg" variant="secondary" asChild data-testid="button-cta-quote">
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
                              data-testid="button-cta-call"
                            >
                              <a href="tel:2084052275">
                                <Phone className="mr-2 h-5 w-5" />
                                (208) 405-2275
                              </a>
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Trust Indicators */}
                      <div className="mt-8 pt-6 border-t border-white/20">
                        <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm text-primary-foreground/90">
                          <span className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-accent" />
                            No Fees or Commissions
                          </span>
                          <span className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-accent" />
                            Close in 7-14 Days
                          </span>
                          <span className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-accent" />
                            We Buy As-Is
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </section>

                {/* Back to Blog */}
                <div className="mt-12 pt-8 border-t">
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/blog">
                      <ChevronLeft className="mr-2 h-5 w-5" />
                      Back to All Articles
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
