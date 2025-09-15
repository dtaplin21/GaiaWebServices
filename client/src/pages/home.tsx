import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import PaymentModal from "@/components/PaymentModal";
import { useState } from "react";

export default function Home() {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
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
      <Header 
        onOpenPaymentModal={() => setIsPaymentModalOpen(true)}
        onScrollToSection={scrollToSection}
      />
      <Hero 
        onOpenPaymentModal={() => setIsPaymentModalOpen(true)}
        onScrollToSection={scrollToSection}
      />
      <Portfolio />
      <About />
      <Contact onOpenPaymentModal={() => setIsPaymentModalOpen(true)} />
      <Footer 
        onOpenPaymentModal={() => setIsPaymentModalOpen(true)}
        onScrollToSection={scrollToSection}
      />
      <PaymentModal 
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
      />
    </div>
  );
}
