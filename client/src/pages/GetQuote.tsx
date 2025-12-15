import { Helmet } from "react-helmet-async";
import { QuoteWizard } from "@/components/QuoteWizard";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, CheckCircle2 } from "lucide-react";
import { generateLocalBusinessSchema } from "@/lib/seo";
import { generateOrganizationSchema, generateBreadcrumbSchema } from "@/lib/schema";
import heroBackground from "@assets/Home Buyer Boise Background Image_1764010277862.png";

export default function GetQuote() {
  const localBusinessSchema = generateLocalBusinessSchema();
  const organizationSchema = generateOrganizationSchema();
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Get Quote", url: "/get-quote" },
  ]);
  const [_, setLocation] = useLocation();
  const [prefilledData, setPrefilledData] = useState<{
    address?: string;
    estimatedValue?: string;
    savings?: string;
  }>({});

  useEffect(() => {
    // Read URL parameters from savings calculator
    const params = new URLSearchParams(window.location.search);
    const address = params.get('address');
    const estimatedValue = params.get('estimatedValue');
    const savings = params.get('savings');

    if (address || estimatedValue || savings) {
      setPrefilledData({ address: address || undefined, estimatedValue: estimatedValue || undefined, savings: savings || undefined });
    }
  }, []);

  const formatCurrency = (amount: string | undefined) => {
    if (!amount) return null;
    const num = parseInt(amount);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <>
      <Helmet>
        <title>Get Your Free Cash Offer | Home Buyer Boise</title>
        <meta name="description" content="Get a fair, no-obligation cash offer for your home in minutes. Our AI-powered system provides accurate, transparent pricing. Sell your house fast in Boise, Meridian, Eagle, Kuna, and the Treasure Valley." />
        <meta name="keywords" content="get cash offer for house, sell house fast quote, free home offer, cash home buyer quote Boise" />
        <link rel="canonical" href="https://homebuyerboise.com/get-quote" />
        
        <meta property="og:title" content="Get Your Free Cash Offer | Home Buyer Boise" />
        <meta property="og:description" content="Get a fair, no-obligation cash offer in minutes. No repairs needed, close on your timeline." />
        <meta property="og:url" content="https://homebuyerboise.com/get-quote" />
        <meta property="og:type" content="website" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Get Your Free Cash Offer" />
        <meta name="twitter:description" content="Sell your house fast for cash. Free, no-obligation quote in minutes." />
        
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>
      
      <div className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroBackground} alt="Get a cash offer for your Boise area home - Home Buyer Boise quote form" className="w-full h-full object-cover opacity-40" width="1920" height="1080" loading="eager" />
        </div>
        <div className="absolute inset-0 z-[1] bg-background/70"></div>
        <div className="py-12 px-4 relative z-10">
          <div className="container max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Get Your Instant Quote
              </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered quoting system provides accurate, transparent pricing in under 2 minutes.
              No waiting for callbacks—get instant results!
            </p>
          </div>

          {/* Show pre-filled info from calculator */}
          {prefilledData.address && (
            <div className="mb-8 max-w-3xl mx-auto">
              <Alert className="border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <AlertDescription>
                  <div className="font-semibold mb-2 text-base">Great! Your property info is pre-filled below:</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <span className="text-muted-foreground">Address:</span>
                      <span className="font-medium">{prefilledData.address}</span>
                    </div>
                    {prefilledData.estimatedValue && (
                      <div className="flex items-start gap-2">
                        <span className="text-muted-foreground">Estimated Value:</span>
                        <span className="font-medium">{formatCurrency(prefilledData.estimatedValue)}</span>
                      </div>
                    )}
                    {prefilledData.savings && (
                      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-primary/20">
                        <TrendingUp className="h-4 w-4 text-[hsl(var(--gold))]" />
                        <span className="text-muted-foreground">Potential Savings:</span>
                        <Badge className="bg-[hsl(var(--gold))]/10 text-[hsl(var(--gold))] border-[hsl(var(--gold))]/30">
                          {formatCurrency(prefilledData.savings)}
                        </Badge>
                      </div>
                    )}
                  </div>
                </AlertDescription>
              </Alert>
            </div>
          )}

          <QuoteWizard 
            onClose={() => setLocation("/")} 
            defaultAddress={prefilledData.address}
          />
        </div>
      </div>
    </div>
    </>
  );
}
