import { CheckCircle2, Clock3, Mail, ShieldCheck } from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StrategyCallForm from "@/components/StrategyCallForm";

export default function BookPage() {
  const navigate = (sectionId: string) => {
    if (sectionId === "book" || sectionId === "contact") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (sectionId === "platforms" || sectionId === "packages" || sectionId === "approach") {
      window.location.href = `/${sectionId}`;
      return;
    }

    window.location.href = sectionId === "home" ? "/" : `/#${sectionId}`;
  };

  return (
    <div className="bg-background text-foreground">
      <Header onScrollToSection={navigate} />
      <main className="bg-stone-50 py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[.85fr_1.15fr] lg:items-start lg:px-8">
          <div className="lg:sticky lg:top-28">
            <p className="section-kicker">Book a strategy call</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
              Start with the business problem.
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Tell us what you are trying to improve, automate, or build. We will review the request and identify the most useful next conversation.
            </p>

            <div className="mt-10 space-y-5">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                  <Clock3 size={20} />
                </div>
                <div>
                  <h2 className="font-semibold text-slate-950">Focused first conversation</h2>
                  <p className="mt-1 text-sm leading-6 text-slate-600">We use your description to prepare before responding.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <h2 className="font-semibold text-slate-950">Practical next steps</h2>
                  <p className="mt-1 text-sm leading-6 text-slate-600">Audit, pilot implementation, or scale—based on your current stage.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h2 className="font-semibold text-slate-950">Direct and confidential</h2>
                  <p className="mt-1 text-sm leading-6 text-slate-600">Your request is delivered directly to our team email.</p>
                </div>
              </div>
            </div>

            <a
              href="mailto:Dtaplin21@gmail.com"
              className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900"
            >
              <Mail size={17} /> Dtaplin21@gmail.com
            </a>
          </div>

          <StrategyCallForm />
        </div>
      </main>
      <Footer onScrollToSection={navigate} />
    </div>
  );
}
