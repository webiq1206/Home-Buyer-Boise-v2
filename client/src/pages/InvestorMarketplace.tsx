import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Helmet } from "react-helmet-async";
import type { Lead } from "@shared/schema";
import { Clock, DollarSign, MapPin, Building, ShoppingCart, AlertCircle } from "lucide-react";

export default function InvestorMarketplace() {
  const { isAuthenticated, user } = useAuth();

  const { data: leads = [], isLoading } = useQuery<Lead[]>({
    queryKey: ["/api/leads/available"],
    enabled: isAuthenticated && user?.role === "investor",
  });

  const calculateLeadAge = (createdAt: Date | string) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffMs = now.getTime() - created.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} old`;
    }
    if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} old`;
    }
    return "Just added";
  };

  const formatCurrency = (amount: string | null) => {
    if (!amount) return "$0.00";
    return `$${parseFloat(amount).toFixed(2)}`;
  };

  const calculateProfit = (lead: Lead) => {
    const rv = lead.estimatedMarketValue ? parseFloat(lead.estimatedMarketValue.toString()) : 0;
    const offer = lead.anchorOffer ? parseFloat(lead.anchorOffer.toString()) : 0;
    const repairs = lead.estimatedRepairs ? parseFloat(lead.estimatedRepairs.toString()) : 0;
    return rv - offer - repairs;
  };

  if (!isAuthenticated) {
    return (
      <div className="container py-12">
        <Card>
          <CardContent className="py-12 text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Sign In Required</h3>
            <p className="text-muted-foreground">Please sign in to view available wholesale leads.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (user?.role !== "investor") {
    return (
      <div className="container py-12">
        <Card>
          <CardContent className="py-12 text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Access Denied</h3>
            <p className="text-muted-foreground">This marketplace is only available to real estate investors.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="text-center">Loading marketplace...</div>
      </div>
    );
  }

  const profit = leads.length > 0 ? leads.reduce((sum, l) => sum + calculateProfit(l), 0) : 0;

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>Wholesale Leads Marketplace | HomeBuyerBoise</title>
        <meta name="description" content="Browse available wholesale property leads - First come, first serve basis." />
      </Helmet>

      <div className="container py-8" data-testid="page-investor-marketplace">
        {/* FCFS Notice Banner */}
        <div className="mb-8 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <AlertCircle className="h-6 w-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-lg font-semibold text-amber-900 dark:text-amber-100 mb-2">
                First Come, First Serve
              </h2>
              <p className="text-sm text-amber-800 dark:text-amber-200">
                Leads are sold on a first come, first serve basis. Once a lead is purchased, it's no longer available to other investors. The full property address will only be revealed after purchase. Prices automatically decrease daily to encourage faster sales.
              </p>
            </div>
          </div>
        </div>

        {/* Header Stats */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Available Wholesale Leads</h1>
          <p className="text-muted-foreground mb-6">
            Fresh wholesale opportunities in the Treasure Valley. Browse, evaluate, and purchase leads at your own pace.
          </p>

          <div className="grid gap-4 md:grid-cols-3 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Available Leads</CardDescription>
                <CardTitle className="text-3xl" data-testid="stat-available-leads">
                  {leads.length}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Market Value</CardDescription>
                <CardTitle className="text-3xl" data-testid="stat-total-rv">
                  {formatCurrency(
                    leads.reduce((sum, l) => sum + parseFloat(l.estimatedMarketValue?.toString() || "0"), 0).toFixed(2)
                  )}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Potential Profit</CardDescription>
                <CardTitle className="text-3xl text-green-600 dark:text-green-400" data-testid="stat-total-profit">
                  {formatCurrency(profit.toFixed(2))}
                </CardTitle>
              </CardHeader>
            </Card>
          </div>
        </div>

        {leads.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No Available Leads</h3>
              <p className="text-muted-foreground">
                Check back soon for new wholesale opportunities. Leads are added regularly as they're approved by our team.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {leads.map((lead) => {
              const age = calculateLeadAge(lead.createdAt);
              const leadProfit = calculateProfit(lead);
              const maskAddress = true; // Full address hidden until purchase

              return (
                <Card key={lead.id} className="overflow-hidden" data-testid={`card-lead-${lead.id}`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-lg" data-testid={`text-lead-name-${lead.id}`}>
                          {lead.name}
                        </CardTitle>
                        <CardDescription className="mt-1">
                          Cash Home Buyer Lead in {lead.city}
                        </CardDescription>
                      </div>
                      <Badge variant="default" data-testid={`badge-age-${lead.id}`}>
                        {age}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Financial Metrics Grid */}
                    <div className="grid grid-cols-4 gap-3 text-sm">
                      <div className="bg-slate-50 dark:bg-slate-900 rounded-md p-3">
                        <p className="text-xs font-medium text-muted-foreground">RV</p>
                        <p className="font-semibold text-lg" data-testid={`text-rv-${lead.id}`}>
                          {formatCurrency(lead.estimatedMarketValue?.toString())}
                        </p>
                      </div>
                      <div className="bg-blue-50 dark:bg-blue-950 rounded-md p-3">
                        <p className="text-xs font-medium text-muted-foreground">Offer</p>
                        <p className="font-semibold text-lg" data-testid={`text-offer-${lead.id}`}>
                          {formatCurrency(lead.anchorOffer?.toString())}
                        </p>
                      </div>
                      <div className="bg-green-50 dark:bg-green-950 rounded-md p-3">
                        <p className="text-xs font-medium text-muted-foreground">Est. Profit</p>
                        <p className="font-semibold text-lg text-green-600 dark:text-green-400" data-testid={`text-profit-${lead.id}`}>
                          {formatCurrency(leadProfit.toFixed(2))}
                        </p>
                      </div>
                      <div className="bg-amber-50 dark:bg-amber-950 rounded-md p-3">
                        <p className="text-xs font-medium text-muted-foreground">Lead Price</p>
                        <p className="font-semibold text-lg" data-testid={`text-lead-price-${lead.id}`}>
                          {formatCurrency(lead.currentLeadPrice)}
                        </p>
                      </div>
                    </div>

                    {/* Property Details - Address Hidden */}
                    <div className="space-y-2 text-sm border-t pt-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span data-testid={`text-location-${lead.id}`}>
                          {maskAddress ? `${lead.city}, Idaho` : lead.address || `${lead.city}, Idaho`}
                        </span>
                        {maskAddress && (
                          <span className="text-xs text-muted-foreground">(Full address shown after purchase)</span>
                        )}
                      </div>
                      {lead.propertyType && (
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-muted-foreground" />
                          <span data-testid={`text-type-${lead.id}`}>
                            {lead.propertyType.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                          </span>
                        </div>
                      )}
                      {lead.condition && (
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-muted-foreground" />
                          <span data-testid={`text-condition-${lead.id}`}>
                            Condition: {lead.condition.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Additional Info if available */}
                    {lead.message && (
                      <div className="border-t pt-4">
                        <p className="text-xs font-medium text-muted-foreground mb-1">Seller Notes</p>
                        <p className="text-sm text-muted-foreground line-clamp-2" data-testid={`text-message-${lead.id}`}>
                          {lead.message}
                        </p>
                      </div>
                    )}

                    {/* CTA */}
                    <div className="flex gap-2 pt-4 border-t">
                      <Button
                        className="flex-1"
                        data-testid={`button-purchase-${lead.id}`}
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Purchase Lead - {formatCurrency(lead.currentLeadPrice)}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
