import { useEffect } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import ApproachPage from "@/pages/approach";
import BookPage from "@/pages/book";
import PackagesPage from "@/pages/packages";
import PlatformsPage from "@/pages/platforms";
import PrivacyPage from "@/pages/privacy";
import ServicesPage from "@/pages/services";
import { ScorecardPage } from "@/scorecard";
import NotFound from "@/pages/not-found";

function BookDiscoveryRedirect() {
  useEffect(() => {
    window.location.replace("/book");
  }, []);

  return null;
}

function ScorecardRoute() {
  return <ScorecardPage discoveryUrl="/book" servicesUrl="/services" />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/approach" component={ApproachPage} />
      <Route path="/book" component={BookPage} />
      <Route path="/contact" component={BookPage} />
      <Route path="/book-discovery" component={BookDiscoveryRedirect} />
      <Route path="/packages" component={PackagesPage} />
      <Route path="/services" component={ServicesPage} />
      <Route path="/platforms" component={PlatformsPage} />
      <Route path="/privacy" component={PrivacyPage} />
      <Route path="/scorecard" component={ScorecardRoute} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
