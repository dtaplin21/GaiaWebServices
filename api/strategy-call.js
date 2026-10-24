import sgMail from "@sendgrid/mail";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, description } = req.body || {};

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof description !== "string" ||
    name.trim().length < 2 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    description.trim().length < 10
  ) {
    return res.status(400).json({ error: "Please provide valid contact details and a project description." });
  }

  if (!process.env.SENDGRID_API_KEY || !process.env.SENDGRID_FROM_EMAIL) {
    return res.status(503).json({ error: "Email service is not configured." });
  }

  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    await sgMail.send({
      to: process.env.CONTACT_EMAIL || "dtaplin21@gmail.com",
      from: process.env.SENDGRID_FROM_EMAIL,
      replyTo: email.trim(),
      subject: `AI strategy call request from ${name.trim()}`,
      text: [
        `Name: ${name.trim()}`,
        `Email: ${email.trim()}`,
        "",
        "What they want:",
        description.trim(),
      ].join("\n"),
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error sending strategy call request:", error);
    return res.status(500).json({ error: "Unable to send the request." });
  }
}
