import { useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Loader2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Answers } from "./questions";

export type GateResult = { email: string; emailedToUser: boolean };

type ScorecardGateProps = {
  answers: Answers;
  onUnlocked: (result: GateResult) => void;
  onBack: () => void;
};

const inputClass =
  "mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-lg text-white outline-none placeholder:text-slate-500 focus:border-cyan-300";

export function ScorecardGate({ answers, onUnlocked, onBack }: ScorecardGateProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [hp, setHp] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/scorecard-results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: trimmed, answers, hp }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(typeof data.error === "string" ? data.error : "Something went wrong. Please try again.");
      }
      onUnlocked({ email: trimmed, emailedToUser: data.emailedToUser !== false });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section>
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-300/10 text-cyan-300">
        <Lock size={22} />
      </div>
      <p className="section-kicker section-kicker-dark mt-8">Your results are ready</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Where should we send them?</h1>
      <p className="mt-6 text-lg leading-8 text-slate-300">
        Enter your email to see your readiness score and diagnosis. We'll email you a copy, and our team receives your
        results so we can follow up with next steps.
      </p>

      <form onSubmit={submit} className="mt-10 space-y-6" noValidate>
        <div>
          <label htmlFor="gate-name" className="text-sm text-slate-400">
            Name <span className="text-slate-500">(optional)</span>
          </label>
          <input
            id="gate-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="name"
            placeholder="Your name"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="gate-email" className="text-sm text-slate-400">
            Email
          </label>
          <input
            id="gate-email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            placeholder="you@company.com"
            className={inputClass}
          />
        </div>

        {/* Honeypot: hidden from people, tempting to bots */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="gate-company-site">Leave this field empty</label>
          <input
            id="gate-company-site"
            tabIndex={-1}
            autoComplete="off"
            value={hp}
            onChange={(event) => setHp(event.target.value)}
          />
        </div>

        {error && (
          <p role="alert" className="rounded-2xl border border-red-400/30 bg-red-400/10 px-5 py-3 text-sm text-red-200">
            {error}
          </p>
        )}

        <div className="flex items-center justify-between gap-4">
          <Button
            type="button"
            variant="ghost"
            onClick={onBack}
            disabled={submitting}
            className="text-slate-300 hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft size={16} /> Back
          </Button>
          <Button
            type="submit"
            disabled={submitting}
            className="h-12 rounded-full bg-cyan-300 px-7 text-slate-950 hover:bg-cyan-200"
          >
            {submitting ? (
              <>
                <Loader2 className="animate-spin" size={17} /> Sending
              </>
            ) : (
              <>
                See my results <ArrowRight size={17} />
              </>
            )}
          </Button>
        </div>
        <p className="text-sm text-slate-500">
          We use your email only to send your results and follow up about them. See our{" "}
          <a href="/privacy" className="underline underline-offset-4 hover:text-white">
            privacy note
          </a>
          .
        </p>
      </form>
    </section>
  );
}
