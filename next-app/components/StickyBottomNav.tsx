import { Home, DollarSign, Phone } from "lucide-react";
import Link from "next/link";

export function StickyBottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm border-t border-primary/20 lg:hidden shadow-lg">
      <div className="container px-0">
        <div className="grid grid-cols-3 h-20">
          <Link 
            href="/services"
            className="flex flex-col items-center justify-center gap-1.5 w-full h-full text-white/80 hover:text-white transition-all duration-200"
            data-testid="nav-bottom-services"
          >
            <Home className="h-6 w-6" />
            <span className="text-xs font-semibold">Services</span>
          </Link>
          
          <Link 
            href="/get-quote" 
            className="flex flex-col items-center justify-center gap-1.5 w-full h-full relative group"
            data-testid="nav-bottom-quote"
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            <div className="relative flex flex-col items-center gap-1.5">
              <div className="bg-[hsl(38,70%,55%)] rounded-full p-2 shadow-md">
                <DollarSign className="h-6 w-6 text-primary" strokeWidth={3} />
              </div>
              <span className="text-xs font-bold text-white">Cash Offer</span>
            </div>
          </Link>
          
          <Link 
            href="/contact"
            className="flex flex-col items-center justify-center gap-1.5 w-full h-full text-white/80 hover:text-white transition-all duration-200"
            data-testid="nav-bottom-schedule"
          >
            <Phone className="h-6 w-6" />
            <span className="text-xs font-semibold">Contact</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
