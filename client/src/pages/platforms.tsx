import Contact from "@/components/Contact";
import CustomPlatforms from "@/components/CustomPlatforms";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function PlatformsPage() {
  const navigate = (sectionId: string) => {
    if (sectionId === "platforms") {
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

    if (sectionId === "packages" || sectionId === "approach") {
      window.location.href = `/${sectionId}`;
      return;
    }

    window.location.href = sectionId === "home" ? "/" : `/#${sectionId}`;
  };

  return (
    <div className="bg-background text-foreground">
      <Header onScrollToSection={navigate} />
      <main>
        <CustomPlatforms />
        <Contact />
      </main>
      <Footer onScrollToSection={navigate} />
    </div>
  );
}
