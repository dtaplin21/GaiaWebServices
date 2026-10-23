import { Network } from "lucide-react";

interface FooterProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function Footer({ onScrollToSection }: FooterProps) {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                  <Network className="text-primary-foreground" size={16} />
                </div>
                <span className="font-bold text-xl">Gaia AI Strategy</span>
              </div>
              <p className="text-muted-foreground mb-4 max-w-md">
                Practical AI strategy, pilot development, deployment planning, and ROI measurement.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>AI opportunity strategy</li>
                <li>Workflow audits</li>
                <li>Pilot development</li>
                <li>ROI measurement</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <button 
                    onClick={() => onScrollToSection('packages')}
                    className="hover:text-foreground transition-colors text-left"
                    data-testid="link-footer-portfolio"
                  >
                    Packages
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onScrollToSection('platforms')}
                    className="hover:text-foreground transition-colors text-left"
                    data-testid="link-footer-about"
                  >
                    Custom Platforms
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onScrollToSection('contact')}
                    className="hover:text-foreground transition-colors text-left"
                    data-testid="link-footer-contact"
                  >
                    Contact
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onScrollToSection('approach')}
                    className="hover:text-foreground transition-colors text-left"
                    data-testid="link-footer-pricing"
                  >
                    Approach
                  </button>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Gaia AI Strategy. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
