import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function Hero({ onScrollToSection }: HeroProps) {
  return (
    <section id="home" className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 opacity-40">
        <div className="absolute left-[12%] top-10 h-72 w-72 rounded-full bg-cyan-400/20 blur-[110px]" />
        <div className="absolute bottom-0 right-[8%] h-96 w-96 rounded-full bg-indigo-500/20 blur-[130px]" />
      </div>
      <div className="relative mx-auto grid min-h-[720px] max-w-7xl items-center gap-14 px-5 py-24 lg:grid-cols-[1.25fr_.75fr] lg:px-8">
        <div>
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
            AI Strategy Consulting Team
          </div>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            Turn AI ambition into a system your business can actually use.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
            We help organizations identify the right AI opportunities, validate them with practical pilots, and build a measurable path from strategy to deployment.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button
              size="lg"
              onClick={() => onScrollToSection("contact")}
              className="h-12 rounded-full bg-cyan-300 px-7 text-slate-950 hover:bg-cyan-200"
            >
              Discuss your AI roadmap <ArrowRight className="ml-2" size={17} />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => onScrollToSection("work")}
              className="h-12 rounded-full border-white/20 bg-transparent px-7 text-white hover:bg-white/10 hover:text-white"
            >
              See client work
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-7 shadow-2xl backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Strategy outcomes</p>
            <div className="mt-6 space-y-5">
              {[
                "A prioritized AI opportunity roadmap",
                "Pilot systems tested against real workflows",
                "A responsible deployment and scale plan",
                "ROI measures tied to business outcomes",
              ].map((outcome) => (
                <div key={outcome} className="flex items-start gap-3 border-b border-white/10 pb-5 last:border-0 last:pb-0">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-cyan-300" size={19} />
                  <span className="leading-6 text-slate-200">{outcome}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute -bottom-5 -left-5 -z-10 h-full w-full rounded-3xl border border-cyan-300/20" />
        </div>
      </div>
    </section>
  );
}
