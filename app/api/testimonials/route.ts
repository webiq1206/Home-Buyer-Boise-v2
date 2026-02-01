import { NextResponse } from "next/server";

// Hardcoded testimonials for SSR - these can be moved to database later
const testimonials = [
  {
    id: "1",
    name: "Sarah M.",
    city: "Boise",
    rating: 5,
    text: "Home Buyer Boise made selling our house incredibly easy. We were facing foreclosure and they gave us a fair cash offer within 24 hours. Closed in just 10 days!",
    serviceType: "foreclosure",
    date: "2025-12-15",
  },
  {
    id: "2",
    name: "Michael T.",
    city: "Meridian",
    rating: 5,
    text: "After inheriting my mother's house, I didn't know where to start. These folks handled everything - even the cleanout. Smooth process from start to finish.",
    serviceType: "inherited",
    date: "2025-11-28",
  },
  {
    id: "3",
    name: "Jennifer & David K.",
    city: "Eagle",
    rating: 5,
    text: "We needed to relocate for work quickly. They bought our house as-is, no repairs needed. The cash offer was fair and they worked around our timeline.",
    serviceType: "relocation",
    date: "2025-10-20",
  },
  {
    id: "4",
    name: "Robert L.",
    city: "Nampa",
    rating: 5,
    text: "As a tired landlord with problem tenants, I was ready to be done. Home Buyer Boise bought my rental property with tenants in place. No hassle at all.",
    serviceType: "landlord",
    date: "2025-09-15",
  },
  {
    id: "5",
    name: "Lisa & Tom R.",
    city: "Caldwell",
    rating: 5,
    text: "Going through a divorce is hard enough. They made selling our house the easy part. Fair split, quick closing, and very professional.",
    serviceType: "divorce",
    date: "2025-08-22",
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const serviceType = searchParams.get("serviceType");

  const filteredTestimonials = serviceType
    ? testimonials.filter((t) => t.serviceType === serviceType)
    : testimonials;

  return NextResponse.json(filteredTestimonials);
}
