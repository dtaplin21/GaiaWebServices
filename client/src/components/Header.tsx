import { useState } from "react";
import { Code } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onOpenPaymentModal: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export default function Header({ onOpenPaymentModal, onScrollToSection }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Code className="text-primary-foreground text-sm" size={16} />
            </div>
            <span className="font-bold text-xl">WebCraft</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => onScrollToSection('home')}
              className="text-sm font-medium hover:text-primary transition-colors"
              data-testid="nav-home"
            >
              Home
            </button>
            <button 
              onClick={() => onScrollToSection('portfolio')}
              className="text-sm font-medium hover:text-primary transition-colors"
              data-testid="nav-portfolio"
            >
              Portfolio
            </button>
            <button 
              onClick={() => onScrollToSection('about')}
              className="text-sm font-medium hover:text-primary transition-colors"
              data-testid="nav-about"
            >
              About
            </button>
            <button 
              onClick={() => onScrollToSection('contact')}
              className="text-sm font-medium hover:text-primary transition-colors"
              data-testid="nav-contact"
            >
              Contact
            </button>
            <Button 
              onClick={onOpenPaymentModal}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
              data-testid="button-get-quote"
            >
              Get Quote
            </Button>
          </nav>
          
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border py-4">
            <nav className="flex flex-col space-y-4">
              <button 
                onClick={() => {
                  onScrollToSection('home');
                  setIsMobileMenuOpen(false);
                }}
                className="text-sm font-medium hover:text-primary transition-colors text-left"
                data-testid="nav-mobile-home"
              >
                Home
              </button>
              <button 
                onClick={() => {
                  onScrollToSection('portfolio');
                  setIsMobileMenuOpen(false);
                }}
                className="text-sm font-medium hover:text-primary transition-colors text-left"
                data-testid="nav-mobile-portfolio"
              >
                Portfolio
              </button>
              <button 
                onClick={() => {
                  onScrollToSection('about');
                  setIsMobileMenuOpen(false);
                }}
                className="text-sm font-medium hover:text-primary transition-colors text-left"
                data-testid="nav-mobile-about"
              >
                About
              </button>
              <button 
                onClick={() => {
                  onScrollToSection('contact');
                  setIsMobileMenuOpen(false);
                }}
                className="text-sm font-medium hover:text-primary transition-colors text-left"
                data-testid="nav-mobile-contact"
              >
                Contact
              </button>
              <Button 
                onClick={() => {
                  onOpenPaymentModal();
                  setIsMobileMenuOpen(false);
                }}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium w-fit"
                data-testid="button-mobile-get-quote"
              >
                Get Quote
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
