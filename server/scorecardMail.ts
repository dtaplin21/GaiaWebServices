// Handles the AI readiness test email gate.
// Used by both the Express route (server/routes.ts) and the Vercel function
// (api-src/scorecard-results.ts -> bundled to api/scorecard-results.js).
//
// The client only sends the raw answers + email. The score, diagnosis, and email
// copy are all recomputed here so the endpoint cannot be used to send arbitrary text.
import sgMail from "@sendgrid/mail";
import { answerLabel, isAnswerComplete, questions, type Answers } from "../client/src/scorecard/questions";
import { formatScore, scoreAnswers } from "../client/src/scorecard/scoring";

const SITE_URL = "https://www.gaiawebservices.com";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type SubmissionResult = { status: number; body: Record<string, unknown> };

// Best-effort limiter (per server instance): 5 submissions per hour per client.
const hits = new Map<string, number[]>();
function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < 60 * 60 * 1000);
  if (recent.length >= 5) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return false;
}

const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Keep only known question ids with valid values. Returns null if anything is missing/invalid.
function sanitizeAnswers(raw: unknown): Answers | null {
  if (!raw || typeof raw !== "object") return null;
  const input = raw as Record<string, unknown>;
  const clean: Answers = {};

  for (const question of questions) {
    const value = input[question.id];
    if (question.kind === "text") {
      if (typeof value !== "string") return null;
      clean[question.id] = value.trim().slice(0, 300);
    } else if (question.kind === "multi") {
      if (!Array.isArray(value)) return null;
      const known = new Set(question.options.map((option) => option.id));
      clean[question.id] = Array.from(new Set(value.filter((id): id is string => typeof id === "string" && known.has(id))));
    } else {
      if (typeof value !== "string") return null;
      clean[question.id] = value;
    }
    if (!isAnswerComplete(question, clean[question.id])) return null;
  }
  return clean;
}

export async function handleScorecardSubmission(body: unknown, clientKey: string): Promise<SubmissionResult> {
  const payload = (body && typeof body === "object" ? body : {}) as Record<string, unknown>;

  // Honeypot: real visitors never fill this hidden field.
  if (typeof payload.hp === "string" && payload.hp.length > 0) {
    return { status: 200, body: { success: true, emailedToUser: false } };
  }

  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const name = typeof payload.name === "string" ? payload.name.trim().slice(0, 100) : "";
  const answers = sanitizeAnswers(payload.answers);

  if (!EMAIL_RE.test(email) || email.length > 200 || !answers) {
    return { status: 400, body: { error: "Please enter a valid email address and complete every question." } };
  }

  if (!process.env.SENDGRID_API_KEY || !process.env.SENDGRID_FROM_EMAIL) {
    return { status: 503, body: { error: "Email service is not configured." } };
  }

  if (rateLimited(clientKey || email.toLowerCase())) {
    return { status: 429, body: { error: "Too many requests. Please try again later." } };
  }

  const result = scoreAnswers(answers);
  const score = formatScore(result.score);
  const qualified = result.qualification.id === "qualified" || result.qualification.id === "priority";
  const ownerEmail = process.env.CONTACT_EMAIL || "dtaplin21@gmail.com";
  const from = {
    email: process.env.SENDGRID_FROM_EMAIL,
    name: process.env.SENDGRID_FROM_NAME || "Gaia AI Strategy",
  };
  const company = typeof answers.company === "string" ? answers.company : "";
  const ctaUrl = `${SITE_URL}${qualified ? "/book" : "/services"}`;
  const ctaLabel = qualified ? "Schedule a discovery call" : "Explore our services";

  // ---------- email to the visitor ----------
  const greeting = name ? `Hi ${name},` : "Hello,";
  const followUp = result.diagnosis.slice(1); // first entry repeats the band summary
  const userText = [
    greeting,
    "",
    "Thanks for taking the AI capability test. Here are your results.",
    "",
    `Readiness score: ${score} out of 10 — ${result.band.title}`,
    result.band.summary,
    "",
    "Scores by area:",
    ...result.dimensions.map((d) => `- ${d.label}: ${formatScore(d.score)} / 10 — ${d.description}`),
    "",
    "Where to start:",
    ...followUp.map((line) => `- ${line}`),
    "",
    `${result.qualification.title}. ${result.qualification.summary}`,
    `${ctaLabel}: ${ctaUrl}`,
    "",
    "Reply to this email if you have questions.",
    "",
    `— ${from.name}`,
    SITE_URL,
  ].join("\n");

  const userHtml = `<div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;max-width:560px;margin:0 auto;color:#0f172a;line-height:1.6">
<p>${escapeHtml(greeting)}</p>
<p>Thanks for taking the AI capability test. Here are your results.</p>
<div style="background:#020617;color:#fff;border-radius:16px;padding:24px;margin:20px 0">
  <div style="font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#67e8f9">Readiness score</div>
  <div style="font-size:44px;font-weight:600;margin:6px 0">${score}<span style="font-size:16px;color:#94a3b8"> / 10</span></div>
  <div style="font-size:18px;font-weight:600">${escapeHtml(result.band.title)}</div>
  <div style="color:#cbd5e1;margin-top:6px">${escapeHtml(result.band.summary)}</div>
</div>
<h3 style="margin:24px 0 8px">Scores by area</h3>
<ul style="padding-left:18px;margin:0">${result.dimensions
    .map(
      (d) =>
        `<li><strong>${escapeHtml(d.label)}: ${formatScore(d.score)} / 10</strong><br><span style="color:#475569">${escapeHtml(d.description)}</span></li>`,
    )
    .join("")}</ul>
<h3 style="margin:24px 0 8px">Where to start</h3>
<ul style="padding-left:18px;margin:0">${followUp.map((line) => `<li>${escapeHtml(line)}</li>`).join("")}</ul>
<h3 style="margin:24px 0 8px">${escapeHtml(result.qualification.title)}</h3>
<p style="margin:0 0 16px">${escapeHtml(result.qualification.summary)}</p>
<p><a href="${ctaUrl}" style="display:inline-block;background:#67e8f9;color:#020617;text-decoration:none;font-weight:600;padding:12px 22px;border-radius:999px">${ctaLabel}</a></p>
<p style="color:#64748b;font-size:13px;margin-top:28px">You received this because you requested your results at gaiawebservices.com. Reply to this email if you have questions.</p>
<p style="color:#64748b;font-size:13px">— ${escapeHtml(from.name)} · <a href="${SITE_URL}" style="color:#64748b">${SITE_URL.replace("https://", "")}</a></p>
</div>`;

  // ---------- email to the owner ----------
  const ownerText = [
    "New AI capability test submission",
    "",
    `Name: ${name || "(not given)"}`,
    `Email: ${email}`,
    ...(company ? [`Company: ${company}`] : []),
    "",
    `Readiness score: ${score} / 10 — ${result.band.title}`,
    `Conversation fit: ${result.qualification.title} (${result.qualification.id})`,
    result.qualification.summary,
    "",
    "Scores by area:",
    ...result.dimensions.map((d) => `- ${d.label}: ${formatScore(d.score)} / 10`),
    "",
    "Diagnosis shown to them:",
    ...result.diagnosis.map((line) => `- ${line}`),
    "",
    "All answers:",
    ...questions.map((q, i) => `${i + 1}. ${q.prompt}\n   ${answerLabel(q, answers[q.id]) || "(blank)"}`),
    "",
    "Reply to this email to reach them directly.",
  ].join("\n");

  const ownerMsg = {
    to: ownerEmail,
    from,
    replyTo: name ? { email, name } : { email },
    subject: `AI test: ${company || name || email} scored ${score}/10 (${result.qualification.title})`,
    text: ownerText,
  };
  const userMsg = {
    to: email,
    from,
    replyTo: { email: ownerEmail, name: from.name },
    subject: `Your AI readiness results: ${score} out of 10`,
    text: userText,
    html: userHtml,
  };

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const [owner, user] = await Promise.allSettled([sgMail.send(ownerMsg), sgMail.send(userMsg)]);

  if (user.status === "rejected") console.error("Scorecard: failed to email visitor:", user.reason);
  if (owner.status === "rejected") {
    console.error("Scorecard: failed to email owner:", owner.reason);
    return { status: 502, body: { error: "We couldn't send your results right now. Please try again." } };
  }

  return { status: 200, body: { success: true, emailedToUser: user.status === "fulfilled" } };
}
