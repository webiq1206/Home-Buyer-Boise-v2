import { QuoteWizard } from "@/components/QuoteWizard";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, CheckCircle2 } from "lucide-react";

export default function GetQuote() {
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
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-background">
      <div className="py-12 px-4">
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
  );
}
