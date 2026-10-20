import Approach from "@/components/Approach";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function ApproachPage() {
  const navigate = (sectionId: string) => {
    if (sectionId === "approach") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (sectionId === "contact") {
      document.getElementById("contact")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      return;
    }

    if (sectionId === "packages") {
      window.location.href = "/packages";
      return;
    }

    window.location.href = sectionId === "home" ? "/" : `/#${sectionId}`;
  };

  return (
    <div className="bg-background text-foreground">
      <Header onScrollToSection={navigate} />
      <main>
        <Approach />
        <Contact />
      </main>
      <Footer onScrollToSection={navigate} />
    </div>
  );
}
