import { Mail, Phone, Instagram } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ContactProps {
  onOpenPaymentModal: () => void;
}

export default function Contact({ onOpenPaymentModal }: ContactProps) {
  return (
    <section id="contact" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-contact">
            Get In Touch
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="text-contact-description">
            Ready to bring your vision to life? Contact me directly to discuss your project needs.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-semibold mb-6" data-testid="heading-contact-info">
                  Contact Information
                </h3>
                
                <div className="space-y-6">
                  {/* Email */}
                  <div className="flex items-center justify-center md:justify-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Mail className="text-primary" size={24} />
                    </div>
                    <div>
                      <p className="font-medium" data-testid="label-email">Email</p>
                      <a 
                        href="mailto:Dtaplin21@gmail.com" 
                        className="text-primary hover:underline"
                        data-testid="link-email"
                      >
                        Dtaplin21@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center justify-center md:justify-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Phone className="text-primary" size={24} />
                    </div>
                    <div>
                      <p className="font-medium" data-testid="label-phone">Phone</p>
                      <a 
                        href="tel:+15103261121" 
                        className="text-primary hover:underline"
                        data-testid="link-phone"
                      >
                        (510) 326-1121
                      </a>
                    </div>
                  </div>

                  {/* Instagram */}
                  <div className="flex items-center justify-center md:justify-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Instagram className="text-primary" size={24} />
                    </div>
                    <div>
                      <p className="font-medium" data-testid="label-instagram">Instagram</p>
                      <a 
                        href="https://instagram.com/aiwebdevs" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                        data-testid="link-instagram"
                      >
                        @aiwebdevs
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Card */}
            <div>
              <Card className="p-8 text-center">
                <CardContent className="space-y-6 p-0">
                  <div>
                    <h3 className="text-2xl font-semibold mb-3" data-testid="heading-cta">
                      Ready to Start Your Project?
                    </h3>
                    <p className="text-muted-foreground mb-6" data-testid="text-cta-description">
                      Get a custom quote for your web development project. I'll provide a detailed estimate based on your specific requirements.
                    </p>
                    <Button 
                      onClick={onOpenPaymentModal}
                      size="lg"
                      className="w-full md:w-auto"
                      data-testid="button-contact-quote"
                    >
                      Get Custom Quote
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}