import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/api/dcma-ai-review", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "GEMINI_API_KEY is not configured on this server." });
      }

      // Lazy instantiation of GoogleGenAI client on-demand
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const { sample, score, maturity, metrics, failedChecks } = req.body;

      const failedChecksString = failedChecks && failedChecks.length > 0 
        ? failedChecks.map((fc: any) => `- DCMA Metric ${fc.metric}: Detected value of ${fc.value} (Benchmark failure). Impact: ${fc.impact}`).join('\n')
        : "No significant DCMA limit threshold breaches.";

      const prompt = `You are a certified PMI-SP and AACE International Scheduling Specialist. Assess the following Primavera P6 CPM schedule:
      - Profile: ${sample === 'bridge' ? 'Hudson Bridge construction baseline schedule' : 'Downtown Commercial Tower schedule'}
      - Score: ${score}% DCMA Compliance
      - Maturity Level: ${maturity}
      - Total Activities: ${metrics?.activities}
      - CPM Relationships: ${metrics?.relationships}
      
      Failed Checks context:
      ${failedChecksString}
      
      Generate a concise technical executive summary with bullet points outlining specific corrective actions to align the logic with Department of Defense DCMA 14 safety and standard logic guidelines. Be very professional, using technical terms like "Critical Path Continuity", "WBS structure", "negative lags", "milestone constraints", and "logical buffers". Do not repeat yourself. Add an encouraging sign-off from "Remote Schedulers Planning Engineers".`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
      });

      res.json({ recommendation: response.text });
    } catch (error: any) {
      console.error("Gemini call error:", error);
      res.status(500).json({ error: error?.message || "Internal failure calling Gemini" });
    }
  });

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
