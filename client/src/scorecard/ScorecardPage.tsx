import { useMemo, useRef, useState, type CSSProperties } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { trackScorecardEvent } from "./analytics";
import { dimensions, isAnswerComplete, questions, type AnswerValue } from "./questions";
import { ScorecardCTA } from "./ScorecardCTA";
import { ScorecardGate, type GateResult } from "./ScorecardGate";
import { formatScore, profileAnswers, scoreAnswers, type Answers } from "./scoring";
import "./scorecard.css";

type Phase = "intro" | "quiz" | "gate" | "results";

type ScorecardPageProps = {
  discoveryUrl: string;
  servicesUrl: string;
};

const routes = new Set(["approach", "book", "packages", "platforms", "scorecard"]);

export function ScorecardPage({ discoveryUrl, servicesUrl }: ScorecardPageProps) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [delivery, setDelivery] = useState<GateResult | null>(null);
  const started = useRef(false);
  const finished = useRef(false);

  const question = questions[index];
  const dimension = dimensions.find(
    (item) => question.kind === "choice" && item.id === question.dimension,
  );
  const selected = answers[question.id];
  const answered = isAnswerComplete(question, selected);
  const result = useMemo(() => scoreAnswers(answers), [answers]);
  const qualified = result.qualification.id === "qualified" || result.qualification.id === "priority";
  const profile = useMemo(() => profileAnswers(answers), [answers]);
  const progress = Math.round((index / questions.length) * 100);

  const navigate = (sectionId: string) => {
    if (sectionId === "scorecard") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (routes.has(sectionId)) {
      window.location.href = `/${sectionId}`;
      return;
    }

    window.location.href = sectionId === "home" ? "/" : `/#${sectionId}`;
  };

  const choose = (value: AnswerValue) => {
    setAnswers((current) => ({ ...current, [question.id]: value }));
  };

  const toggleOption = (optionId: string) => {
    setAnswers((current) => {
      const existing = current[question.id];
      const currentIds = Array.isArray(existing) ? existing : [];
      const nextIds = currentIds.includes(optionId)
        ? currentIds.filter((id) => id !== optionId)
        : [...currentIds, optionId];
      return { ...current, [question.id]: nextIds };
    });
  };

  const startQuiz = () => {
    if (!started.current) {
      started.current = true;
      trackScorecardEvent("scorecard_started");
    }
    setPhase("quiz");
  };

  const continueQuiz = () => {
    if (!answered) return;
    if (index === questions.length - 1) {
      if (!finished.current) {
        finished.current = true;
        trackScorecardEvent("scorecard_completed");
      }
      setPhase("gate");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setIndex((current) => current + 1);
  };

  const unlockResults = (outcome: GateResult) => {
    setDelivery(outcome);
    trackScorecardEvent("scorecard_email_submitted", { qualified });
    trackScorecardEvent("scorecard_results_viewed", { qualified });
    setPhase("results");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const retake = () => {
    started.current = false;
    finished.current = false;
    setAnswers({});
    setDelivery(null);
    setIndex(0);
    setPhase("intro");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-slate-950 text-white">
      <Header onScrollToSection={navigate} />
      <main className="mx-auto min-h-[calc(100vh-5rem)] max-w-3xl px-5 py-16 lg:px-8 lg:py-24">
        {phase === "intro" && (
          <section>
            <p className="section-kicker section-kicker-dark">AI capability test</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
              See whether a pilot is the next step.
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              Twenty-two questions about how the business runs today. Company details and diagnostic answers stay out of the score. The result is a readiness number from 0 to 10 and the three areas to work on first.
            </p>
            <ul className="mt-8 space-y-3 text-slate-300">
              <li>About five minutes.</li>
              <li>No account. Enter your email at the end to see your results.</li>
              <li>You get a score out of 10 and a written diagnosis from your answers, and we email you a copy.</li>
            </ul>
            <Button
              size="lg"
              onClick={startQuiz}
              className="mt-10 h-12 rounded-full bg-cyan-300 px-7 text-slate-950 hover:bg-cyan-200"
            >
              Start the test <ArrowRight size={17} />
            </Button>
          </section>
        )}

        {phase === "quiz" && (
          <section aria-live="polite">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
              <span>{dimension?.label ?? question.group}</span>
              <span>
                {index + 1} of {questions.length}
              </span>
            </div>
            <div className="question-progress mt-4">
              <div className="question-progress-fill" style={{ "--fill": `${progress}%` } as CSSProperties} />
            </div>
            <h1 className="mt-8 text-3xl font-semibold tracking-tight sm:text-4xl">{question.prompt}</h1>
            {question.kind === "multi" && (
              <p className="mt-3 text-sm text-slate-400">Select all that apply. These answers are context, not points.</p>
            )}
            {question.kind === "text" ? (
              question.multiline ? (
                <textarea
                  key={question.id}
                  value={typeof selected === "string" ? selected : ""}
                  onChange={(event) => choose(event.target.value)}
                  placeholder={question.placeholder}
                  rows={5}
                  className="mt-8 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-lg leading-7 text-white outline-none placeholder:text-slate-500 focus:border-cyan-300"
                />
              ) : (
                <input
                  key={question.id}
                  value={typeof selected === "string" ? selected : ""}
                  onChange={(event) => choose(event.target.value)}
                  placeholder={question.placeholder}
                  className="mt-8 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-lg text-white outline-none placeholder:text-slate-500 focus:border-cyan-300"
                />
              )
            ) : question.kind === "multi" ? (
              <div className="mt-8 grid gap-3" role="group" aria-label={question.prompt}>
                {question.options.map((option) => {
                  const isSelected = Array.isArray(selected) && selected.includes(option.id);
                  return (
                    <button
                      key={option.id}
                      type="button"
                      role="checkbox"
                      aria-checked={isSelected}
                      onClick={() => toggleOption(option.id)}
                      className={`rounded-2xl border px-5 py-4 text-left leading-6 transition-colors ${
                        isSelected
                          ? "border-cyan-300 bg-cyan-300/10 text-white"
                          : "border-white/10 bg-white/[0.04] text-slate-200 hover:border-white/30"
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="mt-8 grid gap-3" role="radiogroup" aria-label={question.prompt}>
                {question.options.map((option) => {
                  const isSelected = selected === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => choose(option.id)}
                      className={`rounded-2xl border px-5 py-4 text-left leading-6 transition-colors ${
                        isSelected
                          ? "border-cyan-300 bg-cyan-300/10 text-white"
                          : "border-white/10 bg-white/[0.04] text-slate-200 hover:border-white/30"
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            )}
            <div className="mt-8 flex items-center justify-between gap-4">
              <Button
                variant="ghost"
                onClick={() => (index === 0 ? setPhase("intro") : setIndex((current) => current - 1))}
                className="text-slate-300 hover:bg-white/10 hover:text-white"
              >
                <ArrowLeft size={16} /> Back
              </Button>
              <Button
                onClick={continueQuiz}
                disabled={!answered}
                className="rounded-full bg-cyan-300 px-6 text-slate-950 hover:bg-cyan-200"
              >
                {index === questions.length - 1 ? "See results" : "Next"}
                <ArrowRight size={16} />
              </Button>
            </div>
          </section>
        )}

        {phase === "gate" && (
          <ScorecardGate
            answers={answers}
            onBack={() => setPhase("quiz")}
            onUnlocked={unlockResults}
          />
        )}

        {phase === "results" && (
          <section>
            <p className="section-kicker section-kicker-dark">Your readiness</p>
            {delivery && (
              <p className="mt-4 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 px-5 py-3 text-sm text-cyan-100">
                {delivery.emailedToUser
                  ? `We've emailed a copy of these results to ${delivery.email}. Check your spam folder if it doesn't arrive in a few minutes.`
                  : "We couldn't email you a copy, but your results are below and our team has received them."}
              </p>
            )}
            <div className="mt-8 flex flex-col items-start gap-8 sm:flex-row sm:items-center">
              <div className="score-ring" style={{ "--score": result.score * 10 } as CSSProperties}>
                <div className="score-ring-inner">
                  <span className="text-4xl font-semibold">{formatScore(result.score)}</span>
                  <span className="text-xs uppercase tracking-[0.16em] text-slate-400">out of 10</span>
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-semibold tracking-tight">{result.band.title}</h1>
                <p className="mt-4 max-w-xl leading-7 text-slate-300">{result.band.summary}</p>
                <p className="mt-3 text-sm text-slate-500">
                  Company profile and multi-select answers are not part of this number.
                </p>
              </div>
            </div>

            <div className="mt-12 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">What you told us</p>
              <dl className="mt-4 space-y-4">
                {profile.map((item) => (
                  <div key={item.id}>
                    <dt className="text-sm text-slate-400">{item.prompt}</dt>
                    <dd className="mt-1 whitespace-pre-wrap leading-7">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-12 space-y-5">
              {result.dimensions.map((dimension) => (
                <div key={dimension.id}>
                  <div className="mb-2 flex items-baseline justify-between gap-4">
                    <span className="font-medium">{dimension.label}</span>
                    <span className="text-sm text-slate-400">{formatScore(dimension.score)}</span>
                  </div>
                  <div className="dimension-track">
                    <div
                      className="dimension-fill"
                      style={{ "--fill": `${dimension.score * 10}%` } as CSSProperties}
                    />
                  </div>
                  <p className="mt-2 text-sm text-slate-400">{dimension.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">Diagnosis</p>
              <div className="mt-4 space-y-4 leading-7 text-slate-300">
                {result.diagnosis.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">Conversation fit</p>
              <p className="mt-3 text-lg font-medium">{result.qualification.title}</p>
              <p className="mt-2 leading-7 text-slate-300">{result.qualification.summary}</p>
            </div>

            <ScorecardCTA qualified={qualified} discoveryUrl={discoveryUrl} servicesUrl={servicesUrl} />
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <button type="button" onClick={retake} className="text-sm text-slate-300 underline underline-offset-4 hover:text-white">
                Retake the test
              </button>
              <a href="/privacy" className="text-sm text-slate-400 underline underline-offset-4 hover:text-white">
                Privacy
              </a>
            </div>
          </section>
        )}
      </main>
      <Footer onScrollToSection={navigate} />
    </div>
  );
}

export default ScorecardPage;
