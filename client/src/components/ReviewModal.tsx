import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Review, InsertReview } from "@shared/schema";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReviewModal({ isOpen, onClose }: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    comment: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: reviews, isLoading } = useQuery<Review[]>({
    queryKey: ['/api/reviews'],
  });

  const createReviewMutation = useMutation({
    mutationFn: async (reviewData: InsertReview) => {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit review');
      }
      
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Review Submitted",
        description: "Thank you for your review! It has been published and is now visible.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/reviews'] });
      queryClient.invalidateQueries({ queryKey: ['/api/reviews/featured'] });
      resetForm();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive",
      });
    },
  });

  const resetForm = () => {
    setRating(0);
    setHoveredRating(0);
    setFormData({ name: "", comment: "" });
    setIsSubmitting(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast({
        title: "Rating Required",
        description: "Please select a rating before submitting.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.name.trim() || !formData.comment.trim()) {
      toast({
        title: "Fields Required",
        description: "Please fill in all fields before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    const reviewData: InsertReview = {
      name: formData.name.trim(),
      rating,
      comment: formData.comment.trim(),
    };

    createReviewMutation.mutate(reviewData);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Unknown date';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent 
        className="max-w-4xl max-h-[90vh] overflow-y-auto"
        aria-describedby="review-modal-description"
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Reviews</DialogTitle>
          <p id="review-modal-description" className="sr-only">
            Share your experience and read reviews from other customers
          </p>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Add Review Form */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Share Your Experience</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your name"
                    required
                  />
                </div>
                
                <div>
                  <Label>Rating</Label>
                  <div className="flex gap-1 mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className="focus:outline-none"
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        onClick={() => setRating(star)}
                      >
                        <Star
                          className={`h-6 w-6 ${
                            star <= (hoveredRating || rating)
                              ? "text-yellow-400 fill-current"
                              : "text-muted-foreground"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="comment">Your Review</Label>
                  <Textarea
                    id="comment"
                    value={formData.comment}
                    onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
                    placeholder="Tell us about your experience..."
                    rows={4}
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Review"}
                </Button>
              </form>
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">What Others Are Saying</h3>
            
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-muted rounded-lg p-4 animate-pulse">
                    <div className="h-4 bg-muted-foreground/20 rounded mb-2" />
                    <div className="h-3 bg-muted-foreground/20 rounded mb-2" />
                    <div className="h-3 bg-muted-foreground/20 rounded w-3/4" />
                  </div>
                ))}
              </div>
            ) : reviews && reviews.length > 0 ? (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {reviews.map((review) => (
                  <div key={review.id} className="bg-muted rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{review.name}</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? "text-yellow-400 fill-current"
                                  : "text-muted-foreground"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {formatDate(review.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>No reviews yet. Be the first to share your experience!</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
