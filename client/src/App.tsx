import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HelmetProvider } from "react-helmet-async";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { StickyBottomNav } from "@/components/StickyBottomNav";
import { ScrollToTop } from "@/components/ScrollToTop";
import { useEffect, lazy, Suspense } from "react";
import { initGA } from "./lib/analytics";
import { useAnalytics } from "./hooks/use-analytics";

// Loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

// Lazy-loaded pages for code splitting
const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const Services = lazy(() => import("@/pages/Services"));
const Pricing = lazy(() => import("@/pages/Pricing"));
const GetQuote = lazy(() => import("@/pages/GetQuote"));
const HowItWorks = lazy(() => import("@/pages/HowItWorks"));
const SavingsCalculator = lazy(() => import("@/pages/SavingsCalculator"));
const NotFound = lazy(() => import("@/pages/not-found"));

// Service Pages
const SellHouseFast = lazy(() => import("@/pages/services/SellHouseFast"));
const WeBuyHouses = lazy(() => import("@/pages/services/WeBuyHouses"));
const CashOffer = lazy(() => import("@/pages/services/CashOffer"));
const SellAsIs = lazy(() => import("@/pages/services/SellAsIs"));
const InheritedProperty = lazy(() => import("@/pages/services/InheritedProperty"));
const AvoidForeclosure = lazy(() => import("@/pages/services/AvoidForeclosure"));
const SellHouseDivorce = lazy(() => import("@/pages/services/SellHouseDivorce"));
const RelocationSale = lazy(() => import("@/pages/services/RelocationSale"));
const ProblemTenants = lazy(() => import("@/pages/services/ProblemTenants"));
const ProbateSale = lazy(() => import("@/pages/services/ProbateSale"));
const TaxLiens = lazy(() => import("@/pages/services/TaxLiens"));
const Downsizing = lazy(() => import("@/pages/services/Downsizing"));
const FireWaterDamage = lazy(() => import("@/pages/services/FireWaterDamage"));
const HoarderHouse = lazy(() => import("@/pages/services/HoarderHouse"));
const ExpiredListing = lazy(() => import("@/pages/services/ExpiredListing"));
const BehindMortgage = lazy(() => import("@/pages/services/BehindMortgage"));
const CodeViolations = lazy(() => import("@/pages/services/CodeViolations"));

// Area Pages - Treasure Valley Cities
const Kuna = lazy(() => import("@/pages/areas/Kuna"));
const Boise = lazy(() => import("@/pages/areas/Boise"));
const Meridian = lazy(() => import("@/pages/areas/Meridian"));
const Eagle = lazy(() => import("@/pages/areas/Eagle"));
const Star = lazy(() => import("@/pages/areas/Star"));
const Middleton = lazy(() => import("@/pages/areas/Middleton"));
const Nampa = lazy(() => import("@/pages/areas/Nampa"));
const Caldwell = lazy(() => import("@/pages/areas/Caldwell"));

// Service + City Combination Page (dynamic)
const ServiceCityPage = lazy(() => import("@/pages/services/ServiceCityPage"));

// Legal Pages
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("@/pages/TermsOfService"));

// Admin Pages
const AdminDashboard = lazy(() => import("@/pages/AdminDashboard"));
const PurchaseHistory = lazy(() => import("@/pages/PurchaseHistory"));
const AnalyticsDashboard = lazy(() => import("@/pages/AnalyticsDashboard"));

function Router() {
  useAnalytics();
  
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Navigation />
      <main className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <Switch>
            {/* Core Pages */}
            <Route path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/services" component={Services} />
            <Route path="/pricing" component={Pricing} />
            <Route path="/get-quote" component={GetQuote} />
            <Route path="/how-it-works" component={HowItWorks} />
            <Route path="/savings-calculator" component={SavingsCalculator} />

            {/* Service + City Combination Pages - MUST come before generic service pages */}
            <Route path="/services/:serviceSlug/:citySlug">
              {(params) => <ServiceCityPage serviceSlug={params.serviceSlug} citySlug={params.citySlug} />}
            </Route>

            {/* Service Pages - High-Value Keywords */}
            <Route path="/services/sell-house-fast" component={SellHouseFast} />
            <Route path="/services/we-buy-houses" component={WeBuyHouses} />
            <Route path="/services/cash-offer" component={CashOffer} />
            <Route path="/services/sell-as-is" component={SellAsIs} />
            <Route path="/services/inherited-property" component={InheritedProperty} />
            <Route path="/services/avoid-foreclosure" component={AvoidForeclosure} />
            <Route path="/services/sell-house-divorce" component={SellHouseDivorce} />
            <Route path="/services/relocation-sale" component={RelocationSale} />
            <Route path="/services/problem-tenants" component={ProblemTenants} />
            <Route path="/services/probate-sale" component={ProbateSale} />
            <Route path="/services/tax-liens" component={TaxLiens} />
            <Route path="/services/downsizing" component={Downsizing} />
            <Route path="/services/fire-water-damage" component={FireWaterDamage} />
            <Route path="/services/hoarder-house" component={HoarderHouse} />
            <Route path="/services/expired-listing" component={ExpiredListing} />
            <Route path="/services/behind-mortgage" component={BehindMortgage} />
            <Route path="/services/code-violations" component={CodeViolations} />

            {/* Service Areas - Treasure Valley Cities */}
            <Route path="/areas/kuna" component={Kuna} />
            <Route path="/areas/boise" component={Boise} />
            <Route path="/areas/meridian" component={Meridian} />
            <Route path="/areas/eagle" component={Eagle} />
            <Route path="/areas/star" component={Star} />
            <Route path="/areas/middleton" component={Middleton} />
            <Route path="/areas/nampa" component={Nampa} />
            <Route path="/areas/caldwell" component={Caldwell} />

            {/* Legal Pages */}
            <Route path="/privacy-policy" component={PrivacyPolicy} />
            <Route path="/terms-of-service" component={TermsOfService} />

            {/* Admin Pages */}
            <Route path="/admin/dashboard" component={AdminDashboard} />
            <Route path="/admin/analytics" component={AnalyticsDashboard} />
            <Route path="/admin/purchases" component={PurchaseHistory} />

            {/* 404 */}
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </main>
      <Footer />
      <StickyBottomNav />
    </div>
  );
}

function App() {
  useEffect(() => {
    if (!import.meta.env.VITE_GA_MEASUREMENT_ID) {
      console.warn('Missing required Google Analytics key: VITE_GA_MEASUREMENT_ID');
    } else {
      initGA();
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
