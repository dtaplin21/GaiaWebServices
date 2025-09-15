import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { CreditCard } from "lucide-react";
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || '');

const paymentFormSchema = z.object({
  pageCount: z.string().min(1, "Please select number of pages"),
  includeBackend: z.boolean().default(false),
  customerName: z.string().min(1, "Name is required"),
  customerEmail: z.string().email("Valid email is required"),
  description: z.string().optional(),
});

type PaymentFormData = z.infer<typeof paymentFormSchema>;

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PaymentModal({ isOpen, onClose }: PaymentModalProps) {
  const { toast } = useToast();
  const [calculatedTotal, setCalculatedTotal] = useState(400);
  const [pageCountValue, setPageCountValue] = useState("1");
  const [includeBackendValue, setIncludeBackendValue] = useState(false);

  const form = useForm<PaymentFormData>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      pageCount: "1",
      includeBackend: false,
      customerName: "",
      customerEmail: "",
      description: "",
    },
  });

  const paymentMutation = useMutation({
    mutationFn: async (data: PaymentFormData & { amount: number }) => {
      const response = await apiRequest("POST", "/api/create-payment-intent", data);
      return response.json();
    },
    onSuccess: async (data) => {
      const stripe = await stripePromise;
      if (!stripe) {
        toast({
          title: "Error",
          description: "Stripe failed to load. Please try again.",
          variant: "destructive",
        });
        return;
      }

      const { error } = await stripe.redirectToCheckout({
        sessionId: data.clientSecret,
      });

      if (error) {
        toast({
          title: "Payment Error",
          description: error.message,
          variant: "destructive",
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to initiate payment. Please try again.",
        variant: "destructive",
      });
      console.error("Payment error:", error);
    },
  });

  const calculateTotal = () => {
    const pageCount = parseInt(pageCountValue) || 1;
    let pagesCost = 0;
    
    if (pageCount <= 5) {
      pagesCost = 400 * pageCount;
    } else {
      pagesCost = 400 * 5; // Show 5 pages as placeholder for custom
    }
    
    const backendCost = includeBackendValue ? 1500 : 0;
    const total = pagesCost + backendCost;
    
    setCalculatedTotal(total);
  };

  useEffect(() => {
    calculateTotal();
  }, [pageCountValue, includeBackendValue]);

  const onSubmit = (data: PaymentFormData) => {
    const numericPageCount = parseInt(data.pageCount);
    if (numericPageCount > 5) {
      toast({
        title: "Custom Quote Required",
        description: "For projects with more than 5 pages, please contact me directly for a custom quote.",
        variant: "default",
      });
      return;
    }

    paymentMutation.mutate({
      ...data,
      amount: calculatedTotal,
    });
  };

  const getPagesLabel = () => {
    const pageCount = parseInt(pageCountValue) || 1;
    if (pageCount === 1) return "1 Landing Page";
    if (pageCount <= 5) return `${pageCount} Pages`;
    return "5+ Pages (Custom Quote)";
  };

  const getPagesCost = () => {
    const pageCount = parseInt(pageCountValue) || 1;
    if (pageCount <= 5) return 400 * pageCount;
    return 400 * 5; // Placeholder for custom
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-md max-h-[90vh] overflow-y-auto" data-testid="modal-payment">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold" data-testid="text-modal-title">
            Get Your Quote
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Service Selection */}
          <div className="space-y-4">
            <div>
              <Label className="block text-sm font-medium mb-2">Number of Pages</Label>
              <Select 
                value={pageCountValue} 
                onValueChange={(value) => {
                  setPageCountValue(value);
                  form.setValue("pageCount", value);
                }}
              >
                <SelectTrigger data-testid="select-page-count">
                  <SelectValue placeholder="Select number of pages" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Landing Page</SelectItem>
                  <SelectItem value="2">2 Pages</SelectItem>
                  <SelectItem value="3">3 Pages</SelectItem>
                  <SelectItem value="4">4 Pages</SelectItem>
                  <SelectItem value="5">5 Pages</SelectItem>
                  <SelectItem value="custom">More than 5 pages</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="backend-option"
                checked={includeBackendValue}
                onCheckedChange={(checked) => {
                  setIncludeBackendValue(!!checked);
                  form.setValue("includeBackend", !!checked);
                }}
                data-testid="checkbox-backend"
              />
              <Label htmlFor="backend-option" className="text-sm font-medium">
                Backend with Database (+$1,500)
              </Label>
            </div>
            <p className="text-xs text-muted-foreground ml-6">
              Includes user authentication, database setup, and API development
            </p>
          </div>
          
          {/* Pricing Breakdown */}
          <div className="bg-secondary p-4 rounded-lg" data-testid="pricing-breakdown">
            <h4 className="font-semibold mb-3">Pricing Breakdown</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span data-testid="text-pages-label">{getPagesLabel()}</span>
                <span data-testid="text-pages-cost">${getPagesCost()}</span>
              </div>
              {includeBackendValue && (
                <div className="flex justify-between" data-testid="row-backend">
                  <span>Backend with Database</span>
                  <span>$1,500</span>
                </div>
              )}
              <div className="border-t border-border pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span data-testid="text-total-cost">${calculatedTotal}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Customer Info */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="customer-name" className="block text-sm font-medium mb-2">
                Name *
              </Label>
              <Input
                id="customer-name"
                {...form.register("customerName")}
                className="w-full"
                data-testid="input-customer-name"
              />
              {form.formState.errors.customerName && (
                <p className="text-destructive text-sm mt-1">
                  {form.formState.errors.customerName.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="customer-email" className="block text-sm font-medium mb-2">
                Email *
              </Label>
              <Input
                id="customer-email"
                type="email"
                {...form.register("customerEmail")}
                className="w-full"
                data-testid="input-customer-email"
              />
              {form.formState.errors.customerEmail && (
                <p className="text-destructive text-sm mt-1">
                  {form.formState.errors.customerEmail.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="project-description" className="block text-sm font-medium mb-2">
                Project Description
              </Label>
              <Textarea
                id="project-description"
                rows={3}
                placeholder="Brief description of your project..."
                {...form.register("description")}
                className="w-full resize-none"
                data-testid="textarea-project-description"
              />
            </div>
          </div>
          
          {/* Payment Button */}
          <Button 
            type="submit" 
            disabled={paymentMutation.isPending}
            className="w-full bg-primary text-primary-foreground py-3 rounded-md font-semibold hover:bg-primary/90 transition-colors"
            data-testid="button-proceed-payment"
          >
            {paymentMutation.isPending ? (
              "Processing..."
            ) : (
              <>
                Proceed to Payment <CreditCard className="ml-2" size={16} />
              </>
            )}
          </Button>
          
          <p className="text-xs text-muted-foreground text-center">
            Secure payment powered by Stripe. No hidden fees.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
