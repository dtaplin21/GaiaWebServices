import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSchema } from "@shared/schema";
import type { InsertContact } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Mail, Clock, Rocket, Send } from "lucide-react";

interface ContactProps {
  onOpenPaymentModal: () => void;
}

export default function Contact({ onOpenPaymentModal }: ContactProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. I'll get back to you within 24 hours.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
      console.error("Contact form error:", error);
    },
  });

  const onSubmit = (data: InsertContact) => {
    contactMutation.mutate(data);
  };

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
    <section id="contact" className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4" data-testid="text-contact-title">
              Let's Work Together
            </h2>
            <p className="text-muted-foreground">
              Ready to bring your vision to life? Get in touch and let's discuss your project.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="bg-card p-8 rounded-lg border border-border shadow-sm">
              <h3 className="font-semibold text-xl mb-6" data-testid="text-form-title">Send a Message</h3>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name *
                  </Label>
                  <Input
                    id="name"
                    {...form.register("name")}
                    className="w-full"
                    data-testid="input-name"
                  />
                  {form.formState.errors.name && (
                    <p className="text-destructive text-sm mt-1">{form.formState.errors.name.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...form.register("email")}
                    className="w-full"
                    data-testid="input-email"
                  />
                  {form.formState.errors.email && (
                    <p className="text-destructive text-sm mt-1">{form.formState.errors.email.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    rows={4}
                    {...form.register("message")}
                    className="w-full resize-none"
                    data-testid="textarea-message"
                  />
                  {form.formState.errors.message && (
                    <p className="text-destructive text-sm mt-1">{form.formState.errors.message.message}</p>
                  )}
                </div>
                <Button 
                  type="submit" 
                  disabled={contactMutation.isPending}
                  className="w-full bg-primary text-primary-foreground py-3 rounded-md font-semibold hover:bg-primary/90 transition-colors"
                  data-testid="button-send-message"
                >
                  {contactMutation.isPending ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message <Send className="ml-2" size={16} />
                    </>
                  )}
                </Button>
              </form>
            </Card>
            
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="font-semibold text-xl mb-6" data-testid="text-contact-info-title">Get in Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4" data-testid="contact-email">
                    <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                      <Mail className="text-primary-foreground" size={20} />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-muted-foreground">dtaplin21@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4" data-testid="contact-response-time">
                    <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                      <Clock className="text-primary-foreground" size={20} />
                    </div>
                    <div>
                      <p className="font-medium">Response Time</p>
                      <p className="text-muted-foreground">Within 24 hours</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4" data-testid="contact-timeline">
                    <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                      <Rocket className="text-primary-foreground" size={20} />
                    </div>
                    <div>
                      <p className="font-medium">Project Timeline</p>
                      <p className="text-muted-foreground">1-4 weeks typical</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <Card className="bg-card p-6 rounded-lg border border-border">
                <h4 className="font-semibold mb-3" data-testid="text-quick-start-title">Quick Start Options</h4>
                <div className="space-y-3">
                  <Button 
                    onClick={onOpenPaymentModal}
                    className="w-full bg-accent text-accent-foreground py-2 px-4 rounded-md font-medium hover:bg-accent/90 transition-colors"
                    data-testid="button-instant-quote"
                  >
                    Get Instant Quote
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => scrollToSection('portfolio')}
                    className="w-full border border-border py-2 px-4 rounded-md font-medium hover:bg-secondary transition-colors"
                    data-testid="button-view-portfolio"
                  >
                    View Portfolio
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
