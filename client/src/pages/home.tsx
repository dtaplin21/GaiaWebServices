import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const scrollToSection = (sectionId: string) => {
    if (sectionId === "approach" || sectionId === "packages" || sectionId === "platforms") {
      window.location.href = `/${sectionId}`;
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="bg-background text-foreground">
      <Header onScrollToSection={scrollToSection} />
      <main>
        <Hero onScrollToSection={scrollToSection} />
        <About />
        <Portfolio />
        <Contact />
      </main>
      <Footer onScrollToSection={scrollToSection} />
    </div>
  );
}
