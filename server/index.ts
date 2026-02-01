import express, { type Request, Response, NextFunction } from "express";
import compression from "compression";
import next from "next";
import { registerRoutes } from "./routes";
import { WebhookHandlers } from "./webhookHandlers";

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

declare module 'http' {
  interface IncomingMessage {
    rawBody: unknown
  }
}

const log = (message: string) => {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  console.log(`${formattedTime} [express] ${message}`);
};

nextApp.prepare().then(async () => {
  const app = express();

  // Enable gzip compression for all responses (improves page load performance)
  app.use(compression());

  // CRITICAL: Register Stripe webhook route BEFORE express.json()
  // Webhook needs raw Buffer, not parsed JSON
  app.post(
    '/api/stripe/webhook/:uuid',
    express.raw({ type: 'application/json' }),
    async (req, res) => {
      const signature = req.headers['stripe-signature'];

      if (!signature) {
        return res.status(400).json({ error: 'Missing stripe-signature' });
      }

      try {
        const sig = Array.isArray(signature) ? signature[0] : signature;

        if (!Buffer.isBuffer(req.body)) {
          console.error('STRIPE WEBHOOK ERROR: req.body is not a Buffer');
          return res.status(500).json({ error: 'Webhook processing error' });
        }

        const { uuid } = req.params;
        await WebhookHandlers.processWebhook(req.body as Buffer, sig, uuid);

        res.status(200).json({ received: true });
      } catch (error: any) {
        console.error('Webhook error:', error.message);
        res.status(400).json({ error: 'Webhook processing error' });
      }
    }
  );

// Now apply JSON middleware for all other routes
  app.use(express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    }
  }));
  app.use(express.urlencoded({ extended: false }));

  // Logging middleware
  app.use((req, res, next) => {
    const start = Date.now();
    const path = req.path;
    let capturedJsonResponse: Record<string, any> | undefined = undefined;

    const originalResJson = res.json;
    res.json = function (bodyJson, ...args) {
      capturedJsonResponse = bodyJson;
      return originalResJson.apply(res, [bodyJson, ...args]);
    };

    res.on("finish", () => {
      const duration = Date.now() - start;
      if (path.startsWith("/api")) {
        let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
        if (capturedJsonResponse) {
          logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
        }

        if (logLine.length > 80) {
          logLine = logLine.slice(0, 79) + "…";
        }

        log(logLine);
      }
    });

    next();
  });

  // Register Express API routes (legacy routes that need database)
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // Serve static files from public directory (robots.txt, sitemap.xml, llms.txt, etc.)
  app.use(express.static("public"));

  // 301 redirect old URLs - specific mappings first, then catch-all
  const { specificLegacyRedirects } = await import("./legacyRedirects.js");
  const { legacyUrlRedirect } = await import("./redirects.js");
  app.use(specificLegacyRedirects);
  app.use(legacyUrlRedirect);

  // Let Next.js handle all other routes (SSR pages)
  app.all("*", (req, res) => {
    return handle(req, res);
  });

  // ALWAYS serve the app on the port specified in the environment variable PORT
  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, async () => {
    log(`Next.js ready on port ${port}`);
    
    // Start automated daily lead price reduction cron job
    const { scheduleDailyPriceReduction } = await import("./cron.js");
    scheduleDailyPriceReduction();
    log("Cron job: Daily lead price reduction scheduled");
  });
});
