import { ArrowRight, Check, FlaskConical, ScanSearch, TrendingUp } from "lucide-react";

const packages = [
  {
    number: "01",
    name: "Audit",
    subtitle: "Find the right AI opportunity",
    description:
      "A focused assessment of your workflows, systems, data, and team readiness to identify where AI automation can create practical value.",
    outcomes: [
      "Workflow and systems review",
      "AI readiness assessment",
      "Prioritized opportunity map",
      "Recommended implementation roadmap",
    ],
    icon: ScanSearch,
    cardClass: "bg-blue-700 text-white",
    mutedClass: "text-blue-100",
    accentClass: "bg-blue-500/40 text-blue-100",
  },
  {
    number: "02",
    name: "Testing & Implementation",
    subtitle: "Turn the strategy into a working system",
    description:
      "Design, build, and test an AI pilot inside a real workflow before moving into a broader production deployment.",
    outcomes: [
      "Pilot design and development",
      "Front-end and back-end integration",
      "Workflow testing with your team",
      "Deployment and adoption plan",
    ],
    icon: FlaskConical,
    cardClass: "bg-violet-600 text-white",
    mutedClass: "text-violet-100",
    accentClass: "bg-violet-400/30 text-violet-100",
  },
  {
    number: "03",
    name: "Scale",
    subtitle: "Expand what is already working",
    description:
      "Strengthen a proven AI system, expand it across teams or workflows, and connect growth to measurable operating results.",
    outcomes: [
      "Production optimization",
      "Additional workflow integrations",
      "Governance and documentation",
      "ROI and performance tracking",
    ],
    icon: TrendingUp,
    cardClass: "bg-emerald-500 text-slate-950",
    mutedClass: "text-emerald-950/80",
    accentClass: "bg-emerald-300/50 text-emerald-950",
  },
];

interface PackagesProps {
  onContact: () => void;
}

export default function Packages({ onContact }: PackagesProps) {
  return (
    <section className="bg-stone-50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-4xl">
          <p className="section-kicker">AI consulting packages</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
            Start where your business is today.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            Choose a focused AI audit, move a priority use case through testing and implementation, or scale an automation system that has already proven its value.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {packages.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.number}
                className={`flex min-h-[560px] flex-col rounded-3xl p-7 shadow-xl shadow-slate-200/40 lg:p-8 ${item.cardClass}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs opacity-70">{item.number}</span>
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.accentClass}`}>
                    <Icon size={23} />
                  </div>
                </div>

                <div className="mt-10">
                  <h2 className="text-2xl font-semibold">{item.name}</h2>
                  <p className="mt-2 text-sm font-semibold uppercase tracking-[0.14em] opacity-75">
                    {item.subtitle}
                  </p>
                  <p className={`mt-6 leading-7 ${item.mutedClass}`}>{item.description}</p>
                </div>

                <ul className="mt-8 space-y-4">
                  {item.outcomes.map((outcome) => (
                    <li key={outcome} className="flex items-start gap-3 text-sm">
                      <Check className="mt-0.5 shrink-0" size={17} />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={onContact}
                  className="mt-auto flex items-center justify-between border-t border-current/20 pt-7 text-left text-sm font-semibold"
                >
                  Discuss this package <ArrowRight size={18} />
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
