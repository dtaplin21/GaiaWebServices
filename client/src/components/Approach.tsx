import {
  BarChart3,
  ClipboardCheck,
  FlaskConical,
  Lightbulb,
  Search,
  TrendingUp,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Understand the ambition",
    description: "Clarify what you want AI to improve, the business constraints, and what success should look like.",
    icon: Lightbulb,
  },
  {
    number: "02",
    title: "Audit systems & workflows",
    description: "Map current tools, data, processes, risks, and team readiness to identify practical opportunities.",
    icon: Search,
  },
  {
    number: "03",
    title: "Create the AI manifesto",
    description: "Define guiding principles, priority use cases, governance boundaries, and a focused implementation plan.",
    icon: ClipboardCheck,
  },
  {
    number: "04",
    title: "Develop & test pilots",
    description: "Build small, useful pilots and validate them with the people who will use them in real workflows.",
    icon: FlaskConical,
  },
  {
    number: "05",
    title: "Deploy & scale",
    description: "Move successful pilots into production, support adoption, and create a responsible path to expansion.",
    icon: TrendingUp,
  },
  {
    number: "06",
    title: "Track ROI",
    description: "Measure time saved, quality, revenue impact, adoption, and operating cost against agreed baselines.",
    icon: BarChart3,
  },
];

export default function Approach() {
  return (
    <section id="approach" className="bg-slate-950 py-24 text-white lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-3xl">
          <p className="section-kicker section-kicker-dark">The engagement model</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
            From first question to measurable value.
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            A structured, evidence-led process keeps the work focused on the systems your organization needs—not AI for its own sake.
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-3">
          {steps.map(({ number, title, description, icon: Icon }) => (
            <article key={number} className="group bg-slate-950 p-7 transition-colors hover:bg-slate-900 lg:p-8">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-slate-500">{number}</span>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-300/10 text-cyan-300">
                  <Icon size={19} />
                </div>
              </div>
              <h3 className="mt-10 text-xl font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
