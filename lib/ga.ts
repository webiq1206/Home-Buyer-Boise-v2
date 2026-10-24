/** Site-wide GA4 measurement ID. One tag only — do not load a second ID. */
export const GA_MEASUREMENT_ID = "G-9C36JWKMT1";

/**
 * Custom events may only send these parameters. Form field values
 * (name, phone, email, address, and anything else collected on a form)
 * are never forwarded to analytics.
 */
export const GA_EVENT_PARAM_ALLOWLIST = ["form_name", "status"] as const;
