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
import { Calendar, Clock, ChevronLeft, ChevronRight, Share2, Home, Phone, CheckCircle, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import heroBackground from "@assets/Exclamation Points_1764090286437.png";
import ctaBackground from "@assets/Super Hero_1764090286440.png";

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
        <div className="container py-20">
          <div className="max-w-4xl mx-auto animate-pulse">
            <div className="h-10 bg-[#EFF5FA] rounded w-3/4 mb-6" />
            <div className="h-6 bg-[#EFF5FA] rounded w-1/2 mb-12" />
            <div className="space-y-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-5 bg-[#EFF5FA] rounded" />
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
        <div className="container py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Article Not Found</h1>
            <p className="text-muted-foreground text-lg mb-10">
              The article you're looking for doesn't exist or has been moved.
            </p>
            <Link href="/blog">
              <Button size="lg" className="bg-[#0E4DA4] hover:bg-[#0E4DA4]/90">
                <ChevronLeft className="mr-2 h-5 w-5" />
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
        {/* Hero Section - Brand Blue Gradient */}
        <header className="relative min-h-[45vh] md:min-h-[55vh] flex items-center overflow-hidden bg-gradient-to-br from-[#0E4DA4] to-[#1F3D5C]">
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
          
          <div className="container relative z-10 py-16 md:py-24">
            <div className="max-w-4xl mx-auto">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-sm text-white/70 mb-8" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-white/90 truncate max-w-xs">{post.category}</span>
              </nav>

              <Badge className="mb-6 bg-[#D4A12A]/20 text-[#D4A12A] border-[#D4A12A]/40 text-sm px-4 py-1">
                {post.category}
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-white leading-tight tracking-tight" data-testid="text-post-title">
                {post.title}
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl leading-relaxed">
                {post.excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-base text-white/80">
                <span className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-[#D4A12A]" />
                  {formatDate(post.publishedAt)}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-[#D4A12A]" />
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
        <div className="container py-16 md:py-24">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-12">
              {/* Sidebar - Quick Links for larger screens */}
              <aside className="hidden lg:block lg:col-span-1">
                <div className="sticky top-24">
                  <Card className="border-2 border-[#0E4DA4]/10">
                    <CardContent className="p-6">
                      <h3 className="font-bold mb-4 text-[#0E4DA4]">Quick Links</h3>
                      <div className="space-y-3">
                        <Link href="/get-quote" className="flex items-center gap-2 text-[#D4A12A] hover:text-[#D4A12A]/80 font-semibold transition-colors">
                          <ArrowRight className="h-4 w-4" />
                          Get Your Cash Offer
                        </Link>
                        <Link href="/how-it-works" className="flex items-center gap-2 text-muted-foreground hover:text-[#0E4DA4] transition-colors">
                          <ArrowRight className="h-4 w-4" />
                          How It Works
                        </Link>
                        <Link href="/about" className="flex items-center gap-2 text-muted-foreground hover:text-[#0E4DA4] transition-colors">
                          <ArrowRight className="h-4 w-4" />
                          About Us
                        </Link>
                      </div>
                      
                      <div className="border-t mt-6 pt-6">
                        <p className="text-sm font-semibold text-[#0E4DA4] mb-3">Tags</p>
                        <div className="flex flex-wrap gap-2">
                          {post.tags.slice(0, 5).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs border-[#0E4DA4]/30 text-[#0E4DA4]">
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
                    prose-h2:text-3xl prose-h2:mt-14 prose-h2:mb-6 prose-h2:pb-4 prose-h2:border-b-2 prose-h2:border-[#0E4DA4]/20
                    prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-5 prose-h3:text-[#1F3D5C]
                    prose-h4:text-xl prose-h4:mt-8 prose-h4:mb-4
                    prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:text-lg
                    prose-a:text-[#0E4DA4] prose-a:font-medium prose-a:no-underline hover:prose-a:underline hover:prose-a:text-[#D4A12A]
                    prose-strong:text-foreground prose-strong:font-bold
                    prose-ul:my-6 prose-li:text-muted-foreground prose-li:text-lg
                    prose-ol:my-6
                    prose-blockquote:border-l-4 prose-blockquote:border-[#D4A12A] prose-blockquote:bg-[#EFF5FA] prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-blockquote:text-[#1F3D5C]
                    prose-table:border prose-table:border-border prose-th:bg-[#EFF5FA] prose-th:p-4 prose-th:text-[#0E4DA4] prose-td:p-4 prose-td:border-t"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                  data-testid="content-post-body"
                />

                {/* FAQ Section */}
                {post.faqs && post.faqs.length > 0 && (
                  <section className="mt-20 pt-10 border-t-2 border-[#0E4DA4]/10">
                    <h2 className="text-3xl font-bold mb-8 flex items-center gap-4 text-[#1F3D5C]">
                      <span className="w-1.5 h-10 bg-[#D4A12A] rounded-full"></span>
                      Frequently Asked Questions
                    </h2>
                    <Accordion type="single" collapsible className="space-y-4">
                      {post.faqs.map((faq, index) => (
                        <AccordionItem 
                          key={index} 
                          value={`faq-${index}`}
                          className="border-2 border-[#0E4DA4]/10 rounded-xl px-6 data-[state=open]:bg-[#EFF5FA] data-[state=open]:border-[#0E4DA4]/20"
                        >
                          <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline text-[#1F3D5C] py-5" data-testid={`accordion-faq-${index}`}>
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

                {/* CTA Section - Brand Blue */}
                <section className="mt-20 relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0E4DA4] to-[#1F3D5C]">
                  <div className="absolute inset-0 overflow-hidden rounded-2xl">
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
                  
                  <div className="relative z-10 p-10 md:p-14">
                    <div className="flex flex-col md:flex-row items-center gap-10">
                      <div className="flex-shrink-0">
                        <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center">
                          <Home className="h-12 w-12 text-white" />
                        </div>
                      </div>
                      <div className="flex-1 text-center md:text-left">
                        <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white tracking-tight">
                          Ready to Sell Your House Fast?
                        </h3>
                        <p className="text-white/90 text-lg mb-8 leading-relaxed">
                          Get a fair, no-obligation cash offer on your Boise area home today. 
                          We buy houses in any condition - no repairs, no fees, no hassle.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                          <Link href="/get-quote">
                            <Button size="lg" className="w-full sm:w-auto bg-[#D4A12A] hover:bg-[#D4A12A]/90 text-white text-lg px-8 py-6 h-auto" data-testid="button-cta-quote">
                              Get Your Cash Offer
                              <ChevronRight className="ml-2 h-5 w-5" />
                            </Button>
                          </Link>
                          <Link href="tel:208-314-2458">
                            <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/50 text-white hover:bg-white/10 text-lg px-8 py-6 h-auto" data-testid="button-cta-call">
                              <Phone className="mr-2 h-5 w-5" />
                              (208) 314-2458
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Trust Indicators */}
                    <div className="mt-10 pt-8 border-t border-white/20">
                      <div className="flex flex-wrap justify-center md:justify-start gap-8 text-base text-white/90">
                        <span className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-[#D4A12A]" />
                          No Fees or Commissions
                        </span>
                        <span className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-[#D4A12A]" />
                          Close in 7-14 Days
                        </span>
                        <span className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-[#D4A12A]" />
                          We Buy As-Is
                        </span>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Back to Blog */}
                <div className="mt-14 pt-10 border-t-2 border-[#0E4DA4]/10">
                  <Link href="/blog">
                    <Button variant="outline" size="lg" className="border-[#0E4DA4]/30 text-[#0E4DA4] hover:bg-[#0E4DA4]/10">
                      <ChevronLeft className="mr-2 h-5 w-5" />
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
