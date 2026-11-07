import Footer from "@/components/Footer";
import Header from "@/components/Header";

const routes = new Set(["approach", "book", "packages", "platforms", "scorecard"]);

export default function PrivacyPage() {
  const navigate = (sectionId: string) => {
    if (sectionId === "privacy") {
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
      <main className="mx-auto max-w-3xl px-5 py-20 lg:px-8 lg:py-28">
        <p className="section-kicker">Privacy</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
          What this site keeps.
        </h1>
        <div className="mt-8 space-y-6 text-lg leading-8 text-slate-600">
          <p>
            The AI capability test runs in your browser while you answer. When you enter your email to see your results, we send your answers, your score, and your email address to our team, and we email a copy of your results to you. We use that information to follow up with you about your results.
          </p>
          <p>
            The strategy call form opens an email to our team with the name, email address, and description you enter. We use that message to reply to your request.
          </p>
          <p>The site does not ask you to create an account.</p>
        </div>
      </main>
      <Footer onScrollToSection={navigate} />
    </div>
  );
}
