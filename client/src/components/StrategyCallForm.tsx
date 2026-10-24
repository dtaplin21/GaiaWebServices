import { FormEvent, useState } from "react";
import { ArrowRight, CheckCircle2, Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const contactEmail = "dtaplin21@gmail.com";

export default function StrategyCallForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const mailtoUrl = `mailto:${contactEmail}?subject=${encodeURIComponent(
    `AI strategy call request from ${name || "a prospective client"}`,
  )}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nWhat we need:\n${description}`)}`;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch("/api/strategy-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, description }),
      });

      if (!response.ok) {
        throw new Error("Unable to send request");
      }

      setStatus("success");
      setName("");
      setEmail("");
      setDescription("");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex min-h-[520px] flex-col items-center justify-center rounded-[2rem] border border-emerald-200 bg-emerald-50 p-8 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-white">
          <CheckCircle2 size={30} />
        </div>
        <h2 className="mt-6 text-3xl font-semibold text-slate-950">Request received.</h2>
        <p className="mt-4 max-w-md leading-7 text-slate-600">
          Thank you for sharing your goals. Our team will review your request and reply to the email address you provided.
        </p>
        <Button onClick={() => setStatus("idle")} variant="outline" className="mt-8 rounded-full">
          Send another request
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-2xl shadow-slate-200/60 sm:p-9">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">Consultation request</p>
        <h2 className="mt-3 text-2xl font-semibold text-slate-950">Tell us what you want to build.</h2>
      </div>

      <div className="mt-8 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="strategy-name">Name</Label>
          <Input
            id="strategy-name"
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Your full name"
            autoComplete="name"
            minLength={2}
            required
            className="h-12 rounded-xl"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="strategy-email">Email</Label>
          <Input
            id="strategy-email"
            name="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@company.com"
            autoComplete="email"
            required
            className="h-12 rounded-xl"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="strategy-description">What would you like help with?</Label>
          <Textarea
            id="strategy-description"
            name="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Describe the workflow, business challenge, or AI system you want to explore."
            minLength={10}
            maxLength={4000}
            required
            className="min-h-[170px] resize-y rounded-xl"
          />
          <p className="text-right text-xs text-slate-400">{description.length}/4000</p>
        </div>
      </div>

      {status === "error" && (
        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
          Email delivery is temporarily unavailable. You can send the completed request through your email app instead.
          <a href={mailtoUrl} className="mt-3 flex items-center gap-2 font-semibold text-amber-900 underline">
            <Mail size={15} /> Email this request
          </a>
        </div>
      )}

      <Button
        type="submit"
        disabled={status === "submitting"}
        className="mt-7 h-12 w-full rounded-full bg-blue-700 text-white hover:bg-blue-800"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="mr-2 animate-spin" size={18} /> Sending request
          </>
        ) : (
          <>
            Request a strategy <ArrowRight className="ml-2" size={18} />
          </>
        )}
      </Button>
      <p className="mt-4 text-center text-xs text-slate-500">
        Your request is sent directly to {contactEmail}.
      </p>
    </form>
  );
}
