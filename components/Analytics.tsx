"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { GA_EVENT_PARAM_ALLOWLIST, GA_MEASUREMENT_ID } from "@/lib/ga";

type Gtag = (...args: unknown[]) => void;

function pageLocation(pathname: string): string {
  return `${window.location.origin}${pathname}`;
}

/** Drop query strings and hashes so form values in the URL are not sent. */
function referrerWithoutQuery(): string | undefined {
  if (!document.referrer) return undefined;
  try {
    const url = new URL(document.referrer);
    return `${url.origin}${url.pathname}`;
  } catch {
    return undefined;
  }
}

/**
 * Sends page views for App Router navigations.
 * The gtag snippet itself is in the root layout <head> and does not
 * auto-send a page_view (that hit would include the query string).
 */
export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    const w = window as Window & { gtag?: Gtag };
    if (!w.gtag || !pathname) return;

    const params: Record<string, string> = {
      page_location: pageLocation(pathname),
      page_path: pathname,
      page_title: document.title,
      send_to: GA_MEASUREMENT_ID,
    };
    const referrer = referrerWithoutQuery();
    if (referrer) params.page_referrer = referrer;

    w.gtag("event", "page_view", params);
  }, [pathname]);

  return null;
}

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
): void {
  if (typeof window === "undefined") return;
  const w = window as Window & { gtag?: Gtag };
  if (!w.gtag) return;

  const safe: Record<string, string | number | boolean> = {
    send_to: GA_MEASUREMENT_ID,
  };
  if (params) {
    for (const key of GA_EVENT_PARAM_ALLOWLIST) {
      const value = params[key];
      if (value !== undefined) safe[key] = value;
    }
  }
  w.gtag("event", eventName, safe);
}
