import { useState } from "react";
import { Menu, Network, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onScrollToSection: (sectionId: string) => void;
}

const navigation = [
  { label: "Custom Platforms", id: "platforms" },
  { label: "Packages", id: "packages" },
  { label: "Approach", id: "approach" },
];

export default function Header({ onScrollToSection }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = (sectionId: string) => {
    onScrollToSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/90 text-white backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <button onClick={() => navigate("home")} className="flex items-center gap-3 text-left">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/10">
              <Network className="text-cyan-300" size={19} />
            </div>
            <div>
              <span className="block text-sm font-semibold tracking-[0.18em]">GAIA</span>
              <span className="block text-[10px] uppercase tracking-[0.22em] text-slate-400">AI Strategy</span>
            </div>
          </button>
          
          <nav className="hidden items-center gap-8 md:flex">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                className="text-sm font-medium text-slate-300 transition-colors hover:text-white"
              >
                {item.label}
              </button>
            ))}
            <Button
              onClick={() => navigate("contact")}
              className="rounded-full bg-cyan-300 px-5 text-slate-950 hover:bg-cyan-200"
            >
              Book a strategy call
            </Button>
          </nav>
          
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10 hover:text-white md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </Button>
        </div>
        
        {isMobileMenuOpen && (
          <div className="border-t border-white/10 py-5 md:hidden">
            <nav className="flex flex-col gap-4">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigate(item.id)}
                  className="text-left text-sm font-medium text-slate-300"
                >
                  {item.label}
                </button>
              ))}
              <Button onClick={() => navigate("contact")} className="w-full rounded-full bg-cyan-300 text-slate-950">
                Book a strategy call
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
