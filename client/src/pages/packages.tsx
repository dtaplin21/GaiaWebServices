import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Packages from "@/components/Packages";

export default function PackagesPage() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const navigate = (sectionId: string) => {
    if (sectionId === "packages") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (sectionId === "contact") {
      scrollToContact();
      return;
    }

    if (sectionId === "approach" || sectionId === "book" || sectionId === "platforms") {
      window.location.href = `/${sectionId}`;
      return;
    }

    window.location.href = sectionId === "home" ? "/" : `/#${sectionId}`;
  };

  return (
    <div className="bg-background text-foreground">
      <Header onScrollToSection={navigate} />
      <main>
        <Packages onContact={scrollToContact} />
        <Contact />
      </main>
      <Footer onScrollToSection={navigate} />
    </div>
  );
}
