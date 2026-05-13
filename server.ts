import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  let stripeClient: Stripe | null = null;
  const getStripe = () => {
    if (!stripeClient) {
      const key = process.env.STRIPE_SECRET_KEY;
      if (!key) throw new Error("STRIPE_SECRET_KEY is missing");
      stripeClient = new Stripe(key);
    }
    return stripeClient;
  };

  app.use(express.json());

  // API Routes
  app.post("/api/create-checkout-session", async (req, res) => {
    try {
      const { amount, projectName, type } = req.body;
      const stripe = getStripe();

      const referenceId = `RS-${Math.random().toString(36).toUpperCase().substring(2, 8)}`;
      
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"], // Removed ACH support
        client_reference_id: referenceId,
        metadata: {
          projectName,
          paymentType: type,
          amount: amount.toString()
        },
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: `${type === 'down' ? '30% Retainer' : 'Full Payment'} | ${projectName}`,
                description: `Project Ref: ${referenceId} - Remote Schedulers Planning Services`,
              },
              unit_amount: Math.round(amount * 100),
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${req.headers.origin}/?payment=success&project=${encodeURIComponent(projectName)}&ref=${referenceId}`,
        cancel_url: `${req.headers.origin}/?payment=cancelled`,
      });

      res.json({ url: session.url, referenceId });
    } catch (error: any) {
      console.error("Stripe Error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Proxy Gemini requests if needed through server for privacy (optional)
  // Here we just keep standard Vite setup for the rest

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
