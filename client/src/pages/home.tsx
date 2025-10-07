import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import PaymentModal from "@/components/PaymentModal";
import ReviewModal from "@/components/ReviewModal";
import { useState } from "react";

export default function Home() {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

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
        onOpenReviewModal={() => setIsReviewModalOpen(true)}
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
      <ReviewModal 
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
      />
    </div>
  );
}
