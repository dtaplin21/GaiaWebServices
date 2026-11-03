import { ArrowRight, Compass, Workflow, Lightbulb } from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const offerings = [
  {
    title: "AI Opportunity Assessment",
    description:
      "Identify operational inefficiencies, automation opportunities, and the improvements most likely to matter to the business.",
    action: "Schedule a discovery call",
    href: "/book",
    icon: Compass,
  },
  {
    title: "Workflow Automation & Implementation",
    description:
      "Design and build a solution for a repetitive workflow so the team spends less time on handoffs, rework, and manual updates.",
    action: "Talk through a workflow",
    href: "/book",
    icon: Workflow,
  },
  {
    title: "AI Strategy & Advisory",
    description:
      "Help the company choose technologies, set an implementation order, and give internal teams a plan they can follow.",
    action: "Request a consultation",
    href: "/book",
    icon: Lightbulb,
  },
];

const routes = new Set(["approach", "book", "packages", "platforms", "scorecard"]);

export default function ServicesPage() {
  const navigate = (sectionId: string) => {
    if (sectionId === "services") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (routes.has(sectionId)) {
      window.location.href = `/${sectionId}`;
      return;
    }

    window.location.href = sectionId === "home" ? "/" : `/#${sectionId}`;
  };

  return (
    <div className="bg-background text-foreground">
      <Header onScrollToSection={navigate} />
      <main className="bg-stone-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <p className="section-kicker">Services</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
            Practical help from the first opportunity to a working system.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Grand Gaia helps organizations find the work worth improving, automate a real workflow, and decide what to do next.
          </p>
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {offerings.map((offering) => {
              const Icon = offering.icon;
              return (
                <article key={offering.title} className="flex flex-col rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/40">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                    <Icon size={22} />
                  </div>
                  <h2 className="mt-8 text-2xl font-semibold text-slate-950">{offering.title}</h2>
                  <p className="mt-4 leading-7 text-slate-600">{offering.description}</p>
                  <a href={offering.href} className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900">
                    {offering.action} <ArrowRight size={16} />
                  </a>
                </article>
              );
            })}
          </div>
          <p className="mt-12 text-slate-600">
            Not sure which offering fits?{" "}
            <a href="/scorecard" className="font-semibold text-blue-700 hover:text-blue-900">
              Take the scorecard
            </a>
            .
          </p>
        </div>
      </main>
      <Footer onScrollToSection={navigate} />
    </div>
  );
}
