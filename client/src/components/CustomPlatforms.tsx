import {
  ArrowUpRight,
  Bot,
  Database,
  LayoutDashboard,
  ServerCog,
  ShoppingBag,
  Sprout,
} from "lucide-react";

const platforms = [
  {
    name: "The Unnamed Farm",
    type: "Business & agricultural platform",
    description:
      "A production platform designed to communicate company operations, support ongoing growth, and provide a maintainable digital foundation for the business.",
    frontend: "Responsive customer-facing experience, reusable interface components, and structured content presentation.",
    backend: "Application services, PostgreSQL data modeling, deployment workflows, and ongoing production maintenance.",
    technologies: ["Next.js", "Node.js", "PostgreSQL", "CI/CD"],
    url: "https://www.theunnamedfarm.com/",
    icon: Sprout,
    visualClass: "bg-emerald-500",
    accentClass: "text-emerald-950",
  },
  {
    name: "Batana Oil Ecommerce",
    type: "Full-stack commerce platform",
    description:
      "A customer-facing ecommerce system built to present products, support the buying journey, and connect frontend interactions with backend commerce workflows.",
    frontend: "Product discovery, responsive shopping experiences, conversion-focused interfaces, and customer checkout flows.",
    backend: "Commerce logic, order and payment integrations, deployment pipelines, and production operations.",
    technologies: ["React", "TypeScript", "Ecommerce", "Payments"],
    url: "https://www.thegrandgaia.com/",
    icon: ShoppingBag,
    visualClass: "bg-amber-300",
    accentClass: "text-amber-950",
  },
  {
    name: "AI Quality Control System",
    type: "AI-enabled operations platform",
    description:
      "A custom quality-control and quality-assurance platform that connects an operational dashboard with AI-assisted testing and monitoring workflows.",
    frontend: "Data-rich dashboards, quality-control interfaces, workflow status views, and real-time operational feedback.",
    backend: "AI inference pipelines, automation logic, data services, testing workflows, and system integrations.",
    technologies: ["AI Automation", "Python", "TensorFlow", "React", "Node.js"],
    url: "https://dellsystemmanager.vercel.app/",
    icon: Bot,
    visualClass: "bg-violet-600",
    accentClass: "text-white",
  },
];

export default function CustomPlatforms() {
  return (
    <section className="bg-stone-50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-8 border-b border-slate-200 pb-12 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
          <div>
            <p className="section-kicker">Custom platform development</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
              Frontend and backend systems built around real workflows.
            </h1>
          </div>
          <p className="max-w-xl text-lg leading-8 text-slate-600 lg:justify-self-end">
            Examples of custom platforms we have designed and directed—from customer-facing interfaces to backend services, data models, automation, and production deployment.
          </p>
        </div>

        <div className="mt-12 space-y-8">
          {platforms.map((platform, index) => {
            const Icon = platform.icon;
            return (
              <article
                key={platform.name}
                className="grid overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-200/40 lg:grid-cols-[.72fr_1.28fr]"
              >
                <div className={`flex min-h-[300px] flex-col justify-between p-8 lg:p-10 ${platform.visualClass} ${platform.accentClass}`}>
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-xs opacity-70">0{index + 1}</span>
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">
                      <Icon size={28} />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] opacity-70">{platform.type}</p>
                    <h2 className="mt-3 text-3xl font-semibold">{platform.name}</h2>
                  </div>
                </div>

                <div className="p-8 lg:p-10">
                  <p className="text-lg leading-8 text-slate-600">{platform.description}</p>

                  <div className="mt-8 grid gap-5 sm:grid-cols-2">
                    <div className="rounded-2xl bg-blue-50 p-5">
                      <LayoutDashboard className="text-blue-700" size={22} />
                      <h3 className="mt-4 font-semibold text-slate-950">Frontend development</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{platform.frontend}</p>
                    </div>
                    <div className="rounded-2xl bg-violet-50 p-5">
                      <ServerCog className="text-violet-700" size={22} />
                      <h3 className="mt-4 font-semibold text-slate-950">Backend development</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{platform.backend}</p>
                    </div>
                  </div>

                  <div className="mt-7 flex flex-wrap items-center justify-between gap-5">
                    <div className="flex flex-wrap gap-2">
                      {platform.technologies.map((technology) => (
                        <span
                          key={technology}
                          className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>
                    <a
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900"
                    >
                      View live platform <ArrowUpRight size={16} />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-12 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-600">
          <Database className="shrink-0 text-blue-700" size={20} />
          Every platform is presented as a connected system: interface, application logic, data, integrations, testing, and deployment.
        </div>
      </div>
    </section>
  );
}
