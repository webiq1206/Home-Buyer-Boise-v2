# Home Buyer Boise Website

## Overview
Home Buyer Boise (homebuyerboise.com) is a professional cash home buying platform serving the Boise metro area and Treasure Valley. The site features a fintech-inspired design (deep blue #0E4DA4 and gold #D4A12A) and serves as a lead generation platform for cash home buying services. **CRITICAL: All leads are routed to connect@buymyhouse.co and admin@timberandlove.com for manual evaluation - NO automated estimates are provided.**

## Branding
- **Business Name**: Home Buyer Boise (display text with spaces)
- **Domain**: homebuyerboise.com (URLs without spaces)
- **Phone**: (208) 405-2275
- **Primary Email**: connect@buymyhouse.co
- **Lead Notification Emails**: connect@buymyhouse.co AND admin@timberandlove.com
- **Address**: 3024 W Fairview Ave, Boise, Idaho 83702

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### UI/UX Decisions
- **Design System**: Mobile-first responsive design, fintech-inspired with deep blue (#0E4DA4) primary and gold (#D4A12A) accent colors.
- **Component Library**: shadcn/ui (Radix UI primitives) with custom Tailwind CSS.
- **Visuals**: Service-specific hero backgrounds with descriptive SEO alt tags, consistent typography.
- **Content Layout**: Clean, modern look with simplified layouts, alternating backgrounds, and scannable content sections with proper heading hierarchy.
- **Interactive Elements**: Interactive FAQ accordions, multi-step quote wizard, and property value calculator.
- **Accessibility**: WCAG AA compliant with visible focus states, proper color contrast, ARIA labels, keyboard navigation, and semantic HTML.

### Technical Implementations
- **Frontend Framework**: React 18 with TypeScript.
- **Routing**: Wouter for client-side routing with dynamic service and area routes.
- **State Management**: TanStack Query for server state, React Hook Form with Zod for forms.
- **Lead Capture Flow**: Multi-step QuoteWizard collects property information and routes leads to email for manual evaluation. NO automated pricing or offers displayed.
- **Property Calculator**: Ada/Canyon County assessor data integration for property measurements.
- **SEO Optimization**: 
  - Comprehensive internal linking between service and area pages
  - Descriptive alt tags on all images
  - NAP (Name, Address, Phone) consistency via BUSINESS_INFO constant
  - City-specific metadata and schema markup
  - E-E-A-T trust signals throughout
- **Image Performance**: All hero images include width/height attributes, above-fold images use `loading="eager"`, below-fold use `loading="lazy"`.
- **Email System**: Dual notifications to connect@buymyhouse.co AND admin@timberandlove.com with comprehensive lead details.

### Key Files
- `client/src/lib/seo.ts` - BUSINESS_INFO constant for NAP consistency, SEO data
- `client/src/lib/schema.ts` - JSON-LD schema generation
- `client/src/components/QuoteWizard.tsx` - Lead capture form (no automated estimates)
- `server/email.ts` - Email notification system
- `shared/servicesData.ts` - Service situations and content
- `client/src/pages/services/ServiceTemplate.tsx` - Service page template
- `client/src/pages/areas/AreaTemplate.tsx` - Area page template

### System Design Choices
- **Backend Framework**: Express.js with TypeScript.
- **API Design**: RESTful endpoints with JSON responses.
- **Data Validation**: Shared Zod schemas for client and server.
- **Storage Layer**: PostgreSQL via Neon serverless driver.
- **Build System**: Vite for frontend, esbuild for backend, strict TypeScript.
- **Database Schema**: Drizzle ORM with schema in `shared/schema.ts`.

## Service Areas
Boise, Meridian, Eagle, Kuna, Star, Middleton, Nampa, Caldwell

## External Dependencies

### UI/UX & Components
- **Radix UI**: Headless accessible components (via shadcn/ui).
- **class-variance-authority**: Component variant management.
- **lucide-react**: Icon library.
- **Leaflet**: Interactive maps.

### Form & State Management
- **react-hook-form**: Form state and validation.
- **@hookform/resolvers**: Zod resolver for React Hook Form.
- **@tanstack/react-query**: Server state management.

### Styling
- **Tailwind CSS**: Utility-first CSS framework.
- **tailwind-merge & clsx**: Class merging utilities.

### Data & Validation
- **zod**: Schema validation library.
- **@neondatabase/serverless**: PostgreSQL client.
- **drizzle-orm & drizzle-zod**: ORM and schema validation.

### Utilities
- **date-fns**: Date manipulation.
- **wouter**: Lightweight client-side routing.
- **resend**: Email delivery.
