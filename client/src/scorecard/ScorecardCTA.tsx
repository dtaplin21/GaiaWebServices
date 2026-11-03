import { trackScorecardEvent } from "./analytics";

export type ScorecardCTAProps = {
  qualified: boolean;
  discoveryUrl: string;
  servicesUrl: string;
};

export function ScorecardCTA({ qualified, discoveryUrl, servicesUrl }: ScorecardCTAProps) {
  const primaryUrl = qualified ? discoveryUrl : servicesUrl;
  const secondaryUrl = qualified ? servicesUrl : discoveryUrl;

  return (
    <section className="scorecard-cta">
      <h2>{qualified ? "Ready to Explore Your Opportunities?" : "Explore Ways to Improve Your Business"}</h2>
      <p>
        {qualified
          ? "Schedule a discovery call to discuss your results and identify the right next steps."
          : "Learn how Grand Gaia helps organizations improve workflows and adopt the right technology."}
      </p>
      <div className="scorecard-cta-actions">
        <a
          href={primaryUrl}
          className="scorecard-primary-button"
          onClick={() =>
            trackScorecardEvent(qualified ? "discovery_cta_clicked" : "services_cta_clicked", { qualified })
          }
        >
          {qualified ? "Schedule a Discovery Call" : "Explore Our Services"}
        </a>
        <a
          href={secondaryUrl}
          className="scorecard-secondary-link"
          onClick={() =>
            trackScorecardEvent(qualified ? "services_cta_clicked" : "discovery_cta_clicked", { qualified })
          }
        >
          {qualified ? "View Our Services" : "Request a Consultation"}
        </a>
      </div>
    </section>
  );
}
