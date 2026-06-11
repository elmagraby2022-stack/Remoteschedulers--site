import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import nodemailer from "nodemailer";
import fs from "fs";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(process.cwd(), "data");
const SUBMISSIONS_FILE = path.join(DATA_DIR, "submissions.json");

// Ensure submissions persistence file exists
function ensureSubmissionsFile() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(SUBMISSIONS_FILE)) {
      fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify([], null, 2));
    }
  } catch (error) {
    console.error("Failed to initialize submissions file:", error);
  }
}

// SMTP Transporter setup
function getTransporter() {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = parseInt(process.env.SMTP_PORT || "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
    tls: {
      rejectUnauthorized: false
    }
  });
}

async function startServer() {
  ensureSubmissionsFile();
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // POST endpoint to handle Get a Quote or Free Audit submissions
  app.post("/api/quote", async (req, res) => {
    try {
      const { name, email, phone, company, projectType, service, projectSize, challenges, message } = req.body;

      if (!email) {
        return res.status(400).json({ error: "Email address is required." });
      }

      // Consolidate parameters
      const submissionName = name || "Valued Visitor";
      const submissionPhone = phone || "Not Provided";
      const submissionCompany = company || "Not Provided";
      const submissionType = projectType || service || "General Quote Request";
      const submissionSize = projectSize || "Not Provided";
      const submissionMessage = challenges || message || "Requested a free review or quote through the landing page.";
      const isAuditRequest = !!(req.body.isAuditRequest);

      const newSubmission = {
        id: "sub_" + Date.now() + "_" + Math.random().toString(36).substr(2, 5),
        name: submissionName,
        email,
        phone: submissionPhone,
        company: submissionCompany,
        projectType: submissionType,
        projectSize: submissionSize,
        message: submissionMessage,
        isAuditRequest,
        submittedAt: new Date().toISOString(),
      };

      // Save submission securely
      try {
        ensureSubmissionsFile();
        const data = fs.readFileSync(SUBMISSIONS_FILE, "utf-8");
        const submissions = JSON.parse(data);
        submissions.push(newSubmission);
        fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2));
      } catch (err) {
        console.error("Error writing submission to local storage:", err);
      }

      // Email Setup
      const companyEmail = "info@remoteschedulers.com";
      const isDiscountClaimed = !!(req.body.isDiscountClaimed || (submissionMessage && (submissionMessage.includes("30%") || submissionMessage.toLowerCase().includes("discount"))));
      
      let subject = isAuditRequest ? "New Free Audit Request From Website" : "New Quote Request From Website";
      if (isDiscountClaimed) {
        subject = `🚨 30% DISCOUNT CLAIMED: New Quote Request from ${submissionName}`;
      }

      // Styled internal notification email
      const internalHtml = `
        <div style="font-family: Arial, sans-serif; background-color: #F7F6F0; padding: 30px; display: flex; justify-content: center;">
          <div style="background-color: #0A192F; color: #EDEAE2; max-width: 600px; width: 100%; border-top: 8px solid #C9A84C; border-radius: 4px; box-shadow: 0 4px 15px rgba(0,0,0,0.15); overflow: hidden;">
            <div style="padding: 30px; text-align: center; border-bottom: 1px solid #1E2D4A;">
              <h1 style="color: #C9A84C; margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: 2px;">Remote Schedulers</h1>
              <p style="margin: 5px 0 0 0; font-size: 12px; color: #8F9BB3; text-transform: uppercase; letter-spacing: 1px;">Internal Quote & Audit Notification</p>
            </div>
            <div style="padding: 30px; line-height: 1.6;">
              ${isDiscountClaimed ? `
              <div style="background-color: #5C450B; border-left: 6px solid #C9A84C; padding: 15px; margin-bottom: 25px; border-radius: 2px;">
                <p style="margin: 0; font-weight: bold; color: #EDEAE2; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">🎁 30% FIRST-TIME DISCOUNT CLIENT</p>
                <p style="margin: 5px 0 0 0; color: #EDEAE2; font-size: 12px; opacity: 0.9;">This client claimed the 30% Off Proposal Deal on the website! Please deliver their fixed-price schedule proposal with the promised 30% discount.</p>
              </div>
              ` : ''}
              
              <h2 style="color: #C9A84C; margin-top: 0; border-bottom: 2px solid #C9A84C; padding-bottom: 8px; font-size: 18px;">Submission Details</h2>
              <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #8F9BB3; width: 35%;">Full Name:</td>
                  <td style="padding: 8px 0; color: #EDEAE2;">${submissionName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #8F9BB3;">Email:</td>
                  <td style="padding: 8px 0; color: #EDEAE2;"><a href="mailto:${email}" style="color: #C9A84C; text-decoration: none;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #8F9BB3;">Phone Number:</td>
                  <td style="padding: 8px 0; color: #EDEAE2;">${submissionPhone}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #8F9BB3;">Company:</td>
                  <td style="padding: 8px 0; color: #EDEAE2;">${submissionCompany}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #8F9BB3;">Project Category:</td>
                  <td style="padding: 8px 0; color: #EDEAE2;">${submissionType}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #8F9BB3;">Project Size/Budget:</td>
                  <td style="padding: 8px 0; color: #EDEAE2;">${submissionSize}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #8F9BB3;">30% Offer Claimed:</td>
                  <td style="padding: 8px 0; color: ${isDiscountClaimed ? '#4CAF50' : '#8F9BB3'}; font-weight: ${isDiscountClaimed ? 'bold' : 'normal'};">
                    ${isDiscountClaimed ? "YES (30% Discount Code Applied)" : "No"}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #8F9BB3; vertical-align: top;">Key Message:</td>
                  <td style="padding: 8px 0; color: #EDEAE2; white-space: pre-wrap;">${submissionMessage}</td>
                </tr>
              </table>
            </div>
            <div style="background-color: #0d1e3d; padding: 20px; text-align: center; font-size: 11px; color: #8F9BB3; border-top: 1px solid #1E2D4A;">
              This notification was generated instantly after a submission was captured securely on your site.
            </div>
          </div>
        </div>
      `;

      // Styled auto-reply for the customer
      const autoReplyHtml = `
        <div style="font-family: Arial, sans-serif; background-color: #F7F6F0; padding: 30px; display: flex; justify-content: center;">
          <div style="background-color: #0A192F; color: #EDEAE2; max-width: 600px; width: 100%; border-top: 8px solid #C9A84C; border-radius: 4px; box-shadow: 0 4px 15px rgba(0,0,0,0.15); overflow: hidden;">
            <div style="padding: 30px; text-align: center; border-bottom: 1px solid #1E2D4A;">
              <h1 style="color: #C9A84C; margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: 2px;">Remote Schedulers</h1>
              <p style="margin: 5px 0 0 0; font-size: 11px; color: #8F9BB3; text-transform: uppercase; letter-spacing: 1px;">We Plan. You Build.</p>
            </div>
            <div style="padding: 30px; line-height: 1.6;">
              <h2 style="color: #C9A84C; margin-top: 0; font-size: 18px;">Thank You, ${submissionName}</h2>
              <p style="font-size: 14px; color: #EDEAE2;">We have received your quote request and construction project data successfully. Our tier 1 project controls and scheduling engineers are already reviewing your project details.</p>
              
              <div style="background-color: #112240; padding: 20px; border-left: 4px solid #C9A84C; border-radius: 2px; margin: 25px 0;">
                <p style="margin: 0; font-weight: bold; color: #C9A84C; font-size: 14px;">What Happens Next?</p>
                <ol style="margin: 10px 0 0 0; padding-left: 20px; font-size: 13px; color: #8F9BB3; line-height: 1.8;">
                  <li>We parse your project drawings, milestone restrictions, and WBS requirements.</li>
                  <li>Our coordinator maps out a professional, flat-rate scheduling proposal.</li>
                  <li>A formal fixed-price estimate with your <strong>30% first-time customer discount</strong> will arrive in your inbox within 24 hours.</li>
                </ol>
              </div>

              <p style="font-size: 13px; color: #8F9BB3;">If you have any instant additions or need urgent assistance, don't hesitate to reply directly to this email.</p>
              
              <p style="margin-top: 30px; font-size: 14px; font-weight: bold; color: #C9A84C;">Warm regards,<br><span style="color: #EDEAE2; font-size: 12px; font-weight: normal; color: #8F9BB3;">Planning & Scheduling Team<br>Remote Schedulers Planning Group</span></p>
            </div>
            <div style="background-color: #0d1e3d; padding: 20px; text-align: center; font-size: 10px; color: #4E6182; border-top: 1px solid #1E2D4A; text-transform: uppercase; letter-spacing: 1px;">
              &copy; 2026 Remote Schedulers Planning Group. All Rights Reserved.
            </div>
          </div>
        </div>
      `;

      const transporter = getTransporter();

      if (transporter) {
        // Send internal notification
        await transporter.sendMail({
          from: `"Remote Schedulers Website" <${process.env.SMTP_USER}>`,
          to: companyEmail,
          replyTo: email,
          subject: subject,
          html: internalHtml,
        });

        // Send customer confirmation auto-reply
        try {
          await transporter.sendMail({
            from: `"Remote Schedulers Operations" <${companyEmail}>`,
            to: email,
            subject: `Confirmation: We've Received Your Quote Request`,
            html: autoReplyHtml,
          });
        } catch (autoReplErr) {
          console.error("Auto-reply confirmation delivery failure:", autoReplErr);
        }

        res.json({ success: true, method: "smtp" });
      } else {
        // Beautiful fallback placeholder for local dev/preview
        console.log("================ MOCK EMAIL SANDBOX SENT ===============");
        console.log(`FROM: Website Service Form`);
        console.log(`TO: ${companyEmail}`);
        console.log(`SUBJECT: ${subject}`);
        console.log(`REPLY-TO: ${email}`);
        console.log(`DATA SAVED: ${JSON.stringify(newSubmission, null, 2)}`);
        console.log(`AUTO-REPLY TO CUSTOMER: Confirmation email generated beautifully for ${email}`);
        console.log("========================================================");

        res.json({ 
          success: true, 
          method: "sandbox-simulated",
          message: "SMTP has not been configured in the Environment secrets. Submissions are saved securely to local storage, and high-fidelity emails are printed to the console."
        });
      }
    } catch (error: any) {
      console.error("Submission API Error:", error);
      res.status(500).json({ error: error?.message || "Internal failure handling submission." });
    }
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

