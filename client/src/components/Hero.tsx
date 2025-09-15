import { Button } from "@/components/ui/button";

interface HeroProps {
  onOpenPaymentModal: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export default function Hero({ onOpenPaymentModal, onScrollToSection }: HeroProps) {
  return (
    <section id="home" className="relative py-20 lg:py-32 hero-pattern">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Crafting <span className="gradient-text">Beautiful</span> Web Experiences
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Professional web design and development services that help your business stand out online. From landing pages to full-stack applications.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => onScrollToSection('portfolio')}
              className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              data-testid="button-view-work"
            >
              View My Work
            </Button>
            <Button 
              variant="outline"
              onClick={onOpenPaymentModal}
              className="border border-border px-8 py-3 rounded-lg font-semibold hover:bg-secondary transition-colors"
              data-testid="button-start-project"
            >
              Start Project
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
