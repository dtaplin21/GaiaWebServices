import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ScorecardCTA } from "./ScorecardCTA";

function renderCta(qualified: boolean) {
  return render(
    <ScorecardCTA qualified={qualified} discoveryUrl="/book" servicesUrl="/services" />,
  );
}

function keepClickOnPage(link: HTMLElement) {
  link.addEventListener("click", (event) => event.preventDefault());
}

describe("scorecard call to action", () => {
  it("sends a priority or qualified result to the discovery call", async () => {
    const user = userEvent.setup();
    renderCta(true);

    expect(screen.getByRole("heading", { name: "Ready to Explore Your Opportunities?" })).toBeInTheDocument();
    const primary = screen.getByRole("link", { name: "Schedule a Discovery Call" });
    const secondary = screen.getByRole("link", { name: "View Our Services" });
    expect(primary).toHaveAttribute("href", "/book");
    expect(secondary).toHaveAttribute("href", "/services");

    keepClickOnPage(primary);
    keepClickOnPage(secondary);
    await user.click(primary);
    await user.click(secondary);

    expect(window.dataLayer).toEqual([
      { event: "discovery_cta_clicked", qualified: true },
      { event: "services_cta_clicked", qualified: true },
    ]);
  });

  it("sends an early or conversational result to services first", async () => {
    const user = userEvent.setup();
    renderCta(false);

    expect(screen.getByRole("heading", { name: "Explore Ways to Improve Your Business" })).toBeInTheDocument();
    const primary = screen.getByRole("link", { name: "Explore Our Services" });
    const secondary = screen.getByRole("link", { name: "Request a Consultation" });
    expect(primary).toHaveAttribute("href", "/services");
    expect(secondary).toHaveAttribute("href", "/book");

    keepClickOnPage(primary);
    await user.click(primary);

    expect(window.dataLayer).toEqual([{ event: "services_cta_clicked", qualified: false }]);
  });
});
