// Vercel function source. Bundled by `npm run build:api` into api/scorecard-results.js
// (the generated file is committed so Vercel can pick it up). Edit this file and
// server/scorecardMail.ts, not the generated file.
import { handleScorecardSubmission } from "../server/scorecardMail";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const forwarded = req.headers?.["x-forwarded-for"];
  const clientKey = (Array.isArray(forwarded) ? forwarded[0] : forwarded)?.split(",")[0]?.trim() || "";

  try {
    const result = await handleScorecardSubmission(req.body, clientKey);
    return res.status(result.status).json(result.body);
  } catch (error) {
    console.error("Scorecard submission error:", error);
    return res.status(500).json({ error: "Unable to send your results." });
  }
}
