import { useQuery } from "@tanstack/react-query";
import {
  Award,
  Boxes,
  BrainCircuit,
  BriefcaseBusiness,
  CheckCircle2,
  CloudCog,
  Code2,
  ExternalLink,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import type { AboutInfo } from "@shared/schema";
import domPortrait from "@/assets/Dom.png";

const technicalSkills = [
  {
    title: "Frontend Engineering & UI Architecture",
    icon: Code2,
    color: "bg-blue-50 text-blue-700",
    skills: "React, Next.js, TypeScript, JavaScript (ES6+), component-driven architecture, modular UI systems, Context API, Redux patterns, real-time UI updates, WebSockets, data-driven interfaces, and configurable workflow UIs.",
  },
  {
    title: "2D / 3D Spatial & Visualization Systems",
    icon: Boxes,
    color: "bg-violet-50 text-violet-700",
    skills: "Canvas API, SVG rendering, coordinate systems, geometric transformations, vector math, bounding-box calculations, distance and area computation, grid-based layouts, CAD/PDF spatial data interpretation, and visualization dashboards.",
  },
  {
    title: "Data-Oriented Design & Integration",
    icon: BrainCircuit,
    color: "bg-cyan-50 text-cyan-700",
    skills: "REST APIs, distributed-system integration, PostgreSQL schema modeling, structured domain models, live data streams, event-driven architecture, Redis job queues, asynchronous processing, and simulator-style data workflows.",
  },
  {
    title: "Testing & Reliability",
    icon: ShieldCheck,
    color: "bg-amber-50 text-amber-700",
    skills: "Playwright end-to-end testing, test fixtures, frontend validation workflows, regression testing, GitHub Actions CI/CD, and structured logging for UI-state traceability.",
  },
  {
    title: "Infrastructure & Deployment",
    icon: CloudCog,
    color: "bg-emerald-50 text-emerald-700",
    skills: "Docker, Render, Vercel, Supabase Auth, production deployment, and microservices coordination.",
  },
];

export default function About() {
  const { data: aboutInfo } = useQuery<AboutInfo>({
    queryKey: ['/api/about'],
  });

  const profileImage =
    aboutInfo?.profileImageUrl && aboutInfo.profileImageUrl !== "/src/assets/Dom.png"
      ? aboutInfo.profileImageUrl
      : domPortrait;

  return (
    <section id="credentials" className="bg-stone-50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[.85fr_1.15fr]">
          <div className="mx-auto w-full max-w-md">
            <div className="group relative" tabIndex={0} aria-label="Dominique Taplin. Hover to view credentials and production record.">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-slate-900">
                <div className="absolute inset-0 flex items-center justify-center text-slate-600">
                  <UserRound size={120} strokeWidth={1} />
                </div>
                <img
                  src={profileImage}
                  alt="Dominique Taplin, Managing Partner"
                  className="relative h-full w-full object-cover"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
                <div className="absolute bottom-5 right-5 z-10 max-w-[210px] rounded-2xl border border-white/70 bg-white/95 p-4 text-right shadow-xl backdrop-blur transition-opacity duration-300 group-hover:opacity-0 group-focus-within:opacity-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Role</p>
                  <p className="mt-1 font-semibold text-slate-900">AI Strategy Consultant</p>
                </div>
                <div className="absolute inset-0 z-20 overflow-y-auto bg-cyan-600/80 px-6 py-7 text-white opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-300 text-slate-950">
                      <Award size={20} />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">Credential</p>
                      <p className="font-semibold">IBM AI Certification</p>
                    </div>
                  </div>
                  <ul className="mt-6 space-y-4 text-sm leading-6 text-white">
                    <li>Orchestrated more than 6,000,000 lines of source code, reviewed before implementation, with proof in documentation and video recordings of the process.</li>
                    <li>Identify bugs, edge cases, and failure modes.</li>
                    <li>Deployed an ecommerce site into production with frontend and backend integration, proven sales, and CI/CD pipelines. Active from 2023 to present: thegrandgaia.com.</li>
                    <li>Deployed a company frontend with CI/CD pipelines, continuous growth, and active maintenance from 2023 to present: theunnamedfarm.com.</li>
                    <li>Designed systems with documentation and inference pipelines. Workflows are outlined in documentation using licensed data.</li>
                    <li>Precise prompt engineering. Systems are based on original concepts, with no implementation copied from a GitHub repository. All code is orchestrated and reviewed by the team.</li>
                    <li>Stored records showing that the team built and directed the applications and software.</li>
                    <li>Contracts with companies for beta testing software created with Cursor.</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-2xl font-semibold tracking-tight text-slate-950">Dominique Taplin</h3>
              <p className="mt-1 text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Managing Partner</p>
            </div>
          </div>

          <div>
            <p className="section-kicker">Credentials & expertise</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Strategy grounded in technical execution.
            </h2>
            <p className="mt-7 text-lg leading-8 text-slate-600">
              We work at the intersection of business strategy, AI systems, and digital product development. Our role is to translate broad AI goals into focused initiatives your team can test, understand, and scale with confidence.
            </p>
            <p className="mt-5 leading-7 text-slate-600">
              With hands-on experience building web platforms and AI-enabled workflows, we bring both the strategic view and the implementation awareness needed to keep recommendations practical.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <BrainCircuit className="text-blue-600" size={24} />
                <h3 className="mt-4 font-semibold text-slate-950">AI opportunity design</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">Use cases, readiness, governance, and implementation roadmaps.</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <BriefcaseBusiness className="text-blue-600" size={24} />
                <h3 className="mt-4 font-semibold text-slate-950">Business-first systems</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">Solutions aligned to workflows, adoption, and measurable outcomes.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-28 border-t border-slate-200 pt-20">
          <div className="max-w-3xl">
            <p className="section-kicker">Technical skills</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Full-stack systems expertise.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Technical depth across interface architecture, spatial systems, data integration, testing, and production infrastructure.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {technicalSkills.map(({ title, icon: Icon, color, skills }, index) => (
              <article
                key={title}
                className={`rounded-3xl border border-slate-200 bg-white p-7 ${index === technicalSkills.length - 1 ? "md:col-span-2" : ""}`}
              >
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${color}`}>
                  <Icon size={22} />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-slate-950">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{skills}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-20 overflow-hidden rounded-[2rem] bg-slate-950 text-white">
          <div className="grid lg:grid-cols-[.7fr_1.3fr]">
            <div className="border-b border-white/10 bg-blue-700 p-8 lg:border-b-0 lg:border-r lg:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200">
                Coding agent experience
              </p>
              <p className="mt-10 text-6xl font-semibold tracking-tight">600,000+</p>
              <p className="mt-3 text-lg text-blue-100">lines of source code orchestrated and reviewed</p>
              <div className="mt-10 border-t border-white/20 pt-6">
                <p className="font-semibold">Prompt Engineering</p>
                <p className="mt-2 text-sm text-blue-200">Claude · Cursor · OpenAI</p>
                <p className="mt-1 text-sm text-blue-200">Remote · 2020–Present</p>
              </div>
            </div>

            <div className="p-8 lg:p-10">
              <h2 className="text-3xl font-semibold">AI-assisted software orchestration</h2>
              <p className="mt-5 leading-7 text-slate-300">
                We direct, review, test, and document AI-assisted software development from original concept through production deployment. Our process includes identifying bugs, edge cases, and failure modes before implementation into service.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  "Original system concepts developed without copying or adapting existing GitHub repositories.",
                  "Documented software architecture, inference pipelines, licensed-data workflows, and implementation decisions.",
                  "Maintained records, documentation, and video evidence showing application design and development direction.",
                  "Established beta-testing contracts with companies for software created through Cursor-assisted development.",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 shrink-0 text-cyan-300" size={18} />
                    <p className="text-sm leading-6 text-slate-300">{item}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 max-w-xl">
                <a
                  href="https://www.theunnamedfarm.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 transition-colors hover:bg-white/10"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">Production evidence</p>
                  <h3 className="mt-3 font-semibold">The Unnamed Farm</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">Frontend deployment with CI/CD, continuous growth, and active maintenance since 2023.</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold">
                    Visit site <ExternalLink size={14} />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
