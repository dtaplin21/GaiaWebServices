export type ScorecardEventName =
  | "scorecard_started"
  | "scorecard_completed"
  | "scorecard_email_submitted"
  | "scorecard_results_viewed"
  | "discovery_cta_clicked"
  | "services_cta_clicked"
  | "discovery_booking_confirmed";

type EventDetail = {
  qualified?: boolean;
};

type AnalyticsPayload = { event: ScorecardEventName } & EventDetail;

declare global {
  interface Window {
    dataLayer?: AnalyticsPayload[];
  }
}

export function trackScorecardEvent(event: ScorecardEventName, detail: EventDetail = {}) {
  if (typeof window === "undefined") return;

  const payload: AnalyticsPayload = { event, ...detail };
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
  window.dispatchEvent(new CustomEvent("gaia:analytics", { detail: payload }));
}
