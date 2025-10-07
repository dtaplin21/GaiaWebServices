import ReviewSection from "@/components/ReviewSection";

interface HeroProps {
  onOpenReviewModal: () => void;
}

export default function Hero({ onOpenReviewModal }: HeroProps) {
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
          <ReviewSection onOpenReviewModal={onOpenReviewModal} />
        </div>
      </div>
    </section>
  );
}
