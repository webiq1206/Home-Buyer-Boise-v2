import { Resend } from 'resend';

/**
 * Get Resend credentials from environment variables or Replit connectors
 */
async function getCredentials() {
  // Check if RESEND_API_KEY is provided as an environment variable
  if (process.env.RESEND_API_KEY) {
    return {
      apiKey: process.env.RESEND_API_KEY,
      fromEmail: process.env.RESEND_FROM_EMAIL || 'admin@timberandlove.com'
    };
  }

  // Fall back to Replit connector if no secret is provided
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY
    ? 'repl ' + process.env.REPL_IDENTITY
    : process.env.WEB_REPL_RENEWAL
      ? 'depl ' + process.env.WEB_REPL_RENEWAL
      : null;

  if (!xReplitToken || !hostname) {
    throw new Error('RESEND_API_KEY not found and Replit connectors not available');
  }

  const response = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=resend',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  );

  const data = await response.json();
  const connectionSettings = data.items?.[0];

  if (!connectionSettings || !connectionSettings.settings.api_key) {
    throw new Error('Resend not connected. Please add RESEND_API_KEY to your secrets or connect the Resend integration.');
  }

  return {
    apiKey: connectionSettings.settings.api_key,
    fromEmail: connectionSettings.settings.from_email || 'admin@timberandlove.com'
  };
}

/**
 * Get a fresh Resend client
 * WARNING: Never cache this client - access tokens may expire
 */
export async function getResendClient() {
  const { apiKey, fromEmail } = await getCredentials();
  return {
    client: new Resend(apiKey),
    fromEmail
  };
}

/**
 * Helper function to delay execution (avoids Resend rate limits)
 */
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
