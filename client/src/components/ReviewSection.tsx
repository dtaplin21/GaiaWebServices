import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Star, Quote, Eye } from "lucide-react";
import type { Review } from "@shared/schema";

interface ReviewSectionProps {
  onOpenReviewModal: () => void;
}

export default function ReviewSection({ onOpenReviewModal }: ReviewSectionProps) {
  const { data: featuredReview, isLoading } = useQuery<Review>({
    queryKey: ['/api/reviews/featured'],
  });

  if (isLoading) {
    return (
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <div className="bg-muted rounded-lg p-6 w-full max-w-md animate-pulse">
          <div className="h-4 bg-muted-foreground/20 rounded mb-2" />
          <div className="h-3 bg-muted-foreground/20 rounded mb-4" />
          <div className="h-3 bg-muted-foreground/20 rounded w-3/4" />
        </div>
        <div className="flex flex-col gap-3">
          <Button 
            onClick={onOpenReviewModal}
            className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Add Review
          </Button>
          <Button 
            variant="outline"
            onClick={onOpenReviewModal}
            className="border border-border px-8 py-3 rounded-lg font-semibold hover:bg-secondary transition-colors"
          >
            <Eye className="h-4 w-4 mr-2" />
            View All Reviews
          </Button>
        </div>
      </div>
    );
  }

  if (!featuredReview) {
    return (
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <div className="bg-muted rounded-lg p-6 w-full max-w-md text-center">
          <p className="text-muted-foreground">No reviews yet. Be the first to share your experience!</p>
        </div>
        <div className="flex flex-col gap-3">
          <Button 
            onClick={onOpenReviewModal}
            className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Add Review
          </Button>
          <Button 
            variant="outline"
            onClick={onOpenReviewModal}
            className="border border-border px-8 py-3 rounded-lg font-semibold hover:bg-secondary transition-colors"
          >
            <Eye className="h-4 w-4 mr-2" />
            View All Reviews
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      {/* Featured Review Card */}
      <div className="bg-muted rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center gap-2 mb-3">
          <Quote className="h-5 w-5 text-primary" />
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < featuredReview.rating
                    ? "text-yellow-400 fill-current"
                    : "text-muted-foreground"
                }`}
              />
            ))}
          </div>
        </div>
        <blockquote className="text-sm text-muted-foreground mb-3 italic">
          "{featuredReview.comment}"
        </blockquote>
        <cite className="text-sm font-medium not-italic">
          — {featuredReview.name}
        </cite>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3">
        <Button 
          onClick={onOpenReviewModal}
          className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
        >
          Add Review
        </Button>
        <Button 
          variant="outline"
          onClick={onOpenReviewModal}
          className="border border-border px-8 py-3 rounded-lg font-semibold hover:bg-secondary transition-colors"
        >
          View All Reviews
        </Button>
      </div>
    </div>
  );
}
