export const dimensions = [
  {
    id: "systems",
    label: "Systems",
    description: "Whether the tools and CRM are clear enough to build on.",
  },
  {
    id: "operations",
    label: "Operations",
    description: "How much of the week still goes to repetitive work.",
  },
  {
    id: "demand",
    label: "Pipeline",
    description: "How leads are created, answered, and tracked.",
  },
  {
    id: "customers",
    label: "Customers",
    description: "How satisfaction and retention are measured.",
  },
  {
    id: "decisions",
    label: "Decisions",
    description: "Whether choices are made from shared numbers.",
  },
  {
    id: "automation",
    label: "AI and automation",
    description: "What you have already tried, and whether there is a plan.",
  },
] as const;

export type DimensionId = (typeof dimensions)[number]["id"];

export type AnswerOption = {
  id: string;
  label: string;
  points: number;
};

export type DiagnosticOption = {
  id: string;
  label: string;
};

type QuestionBase = {
  id: string;
  group: string;
  prompt: string;
};

export type TextQuestion = QuestionBase & {
  kind: "text";
  placeholder: string;
  multiline?: boolean;
};

export type ChoiceQuestion = QuestionBase & {
  kind: "choice";
  options: AnswerOption[];
  dimension?: DimensionId;
};

export type MultiQuestion = QuestionBase & {
  kind: "multi";
  options: DiagnosticOption[];
};

export type ScorecardQuestion = TextQuestion | ChoiceQuestion | MultiQuestion;

export type AnswerValue = string | string[];
export type Answers = Record<string, AnswerValue>;

const choice = (question: Omit<ChoiceQuestion, "kind">): ChoiceQuestion => ({
  kind: "choice",
  ...question,
});

const text = (question: Omit<TextQuestion, "kind">): TextQuestion => ({
  kind: "text",
  ...question,
});

const multi = (question: Omit<MultiQuestion, "kind">): MultiQuestion => ({
  kind: "multi",
  ...question,
});

export const questions: ScorecardQuestion[] = [
  text({
    id: "job-title",
    group: "About you",
    prompt: "What's your job title?",
    placeholder: "Founder, operations lead, sales manager",
  }),
  choice({
    id: "revenue",
    group: "Your business",
    prompt: "What is your company's annual revenue?",
    options: [
      { id: "under-250k", label: "Under $250k", points: 0 },
      { id: "250k-1m", label: "$250k to $1 million", points: 0 },
      { id: "1m-5m", label: "$1 million to $5 million", points: 0 },
      { id: "5m-20m", label: "$5 million to $20 million", points: 0 },
      { id: "over-20m", label: "Over $20 million", points: 0 },
    ],
  }),
  choice({
    id: "headcount",
    group: "Your business",
    prompt: "How many employees or contractors work for your business?",
    options: [
      { id: "solo", label: "Just me", points: 0 },
      { id: "2-10", label: "2–10", points: 0 },
      { id: "11-50", label: "11–50", points: 0 },
      { id: "51-200", label: "51–200", points: 0 },
      { id: "200-plus", label: "More than 200", points: 0 },
    ],
  }),
  text({
    id: "industry",
    group: "Your business",
    prompt: "What industry are you in?",
    placeholder: "Home services, professional services, ecommerce",
  }),
  choice({
    id: "crm",
    group: "Systems",
    dimension: "systems",
    prompt: "Do you currently use a CRM?",
    options: [
      { id: "no", label: "No", points: 0 },
      { id: "spreadsheet", label: "Spreadsheets or a shared inbox", points: 3 },
      { id: "uneven", label: "A CRM that is used unevenly", points: 7 },
      { id: "current", label: "A CRM the team keeps current", points: 10 },
    ],
  }),
  choice({
    id: "tools",
    group: "Systems",
    dimension: "systems",
    prompt: "Roughly how many different tools or subscriptions do you use to run your business paid and free?",
    options: [
      { id: "1-5", label: "1–5", points: 10 },
      { id: "6-10", label: "6–10", points: 7 },
      { id: "11-20", label: "11–20", points: 3 },
      { id: "20-plus", label: "More than 20", points: 0 },
    ],
  }),
  choice({
    id: "stack",
    group: "Systems",
    dimension: "systems",
    prompt: "Do you feel your tech stack is giving you clarity or adding complexity?",
    options: [
      { id: "complexity", label: "It mostly adds complexity", points: 0 },
      { id: "mixed", label: "It is mixed", points: 3 },
      { id: "clarity", label: "It mostly gives us clarity", points: 7 },
      { id: "clear", label: "It is clear, and we know what to simplify", points: 10 },
    ],
  }),
  choice({
    id: "hours",
    group: "Operations",
    dimension: "operations",
    prompt: "On average, how many hours per week do you and your team spend on repetitive tasks?",
    options: [
      { id: "20-plus", label: "More than 20 hours", points: 0 },
      { id: "11-20", label: "11–20 hours", points: 3 },
      { id: "5-10", label: "5–10 hours", points: 7 },
      { id: "under-5", label: "Under 5 hours", points: 10 },
    ],
  }),
  multi({
    id: "tasks",
    group: "Operations",
    prompt: "Which tasks take up most of your time?",
    options: [
      { id: "scheduling", label: "Scheduling and calendar" },
      { id: "invoicing", label: "Invoicing and payments" },
      { id: "data-entry", label: "Data entry" },
      { id: "follow-up", label: "Lead follow-up" },
      { id: "support", label: "Customer support" },
      { id: "reporting", label: "Reporting" },
      { id: "hiring", label: "Hiring and onboarding" },
      { id: "admin", label: "Other admin work" },
    ],
  }),
  choice({
    id: "leads",
    group: "Pipeline",
    dimension: "demand",
    prompt: "Do you have a consistent system for generating leads?",
    options: [
      { id: "no", label: "No", points: 0 },
      { id: "depends", label: "It depends on who has time", points: 3 },
      { id: "partial", label: "A process some of the team follows", points: 7 },
      { id: "owned", label: "A consistent system with an owner", points: 10 },
    ],
  }),
  choice({
    id: "response",
    group: "Pipeline",
    dimension: "demand",
    prompt: "How often do your leads get a response within one minute of them becoming a lead?",
    options: [
      { id: "rarely", label: "Rarely", points: 0 },
      { id: "sometimes", label: "Sometimes, during the workday", points: 3 },
      { id: "often", label: "Often, if the right person sees it", points: 7 },
      { id: "almost-always", label: "Almost always", points: 10 },
    ],
  }),
  choice({
    id: "pipeline",
    group: "Pipeline",
    dimension: "demand",
    prompt: "How well do you track your leads and opportunities through your pipeline?",
    options: [
      { id: "none", label: "We don't track this", points: 0 },
      { id: "notes", label: "Notes or a spreadsheet", points: 3 },
      { id: "partial", label: "A pipeline that is partly up to date", points: 7 },
      { id: "trusted", label: "A pipeline the team trusts", points: 10 },
    ],
  }),
  multi({
    id: "sales-challenges",
    group: "Pipeline",
    prompt: "What are the biggest sales challenges you face right now?",
    options: [
      { id: "volume", label: "Not enough leads" },
      { id: "slow", label: "Slow follow-up" },
      { id: "cold", label: "Leads go cold" },
      { id: "unclear", label: "Unclear pipeline" },
      { id: "cycle", label: "Long sales cycle" },
      { id: "close", label: "Inconsistent close rate" },
      { id: "forecast", label: "Hard to forecast revenue" },
    ],
  }),
  multi({
    id: "support",
    group: "Customers",
    prompt: "How do customers currently get support?",
    options: [
      { id: "email", label: "Email" },
      { id: "phone", label: "Phone" },
      { id: "chat", label: "Text or chat" },
      { id: "social", label: "Social messages" },
      { id: "desk", label: "Help desk" },
      { id: "in-person", label: "In person" },
      { id: "unset", label: "There is no set way" },
    ],
  }),
  choice({
    id: "satisfaction",
    group: "Customers",
    dimension: "customers",
    prompt: "How do you measure customer satisfaction and retention?",
    options: [
      { id: "none", label: "We don't measure it", points: 0 },
      { id: "complaints", label: "We notice when customers complain", points: 3 },
      { id: "sometimes", label: "We ask some customers", points: 7 },
      { id: "cadence", label: "We track satisfaction and retention on a schedule", points: 10 },
    ],
  }),
  choice({
    id: "dashboard",
    group: "Decisions",
    dimension: "decisions",
    prompt: "Do you currently have a central dashboard that shows key business data in real time?",
    options: [
      { id: "no", label: "No", points: 0 },
      { id: "on-request", label: "Someone builds a report when asked", points: 3 },
      { id: "stale", label: "A dashboard that is often stale", points: 7 },
      { id: "live", label: "A live dashboard used to run the business", points: 10 },
    ],
  }),
  choice({
    id: "decisions",
    group: "Decisions",
    dimension: "decisions",
    prompt: "How are business decisions made?",
    options: [
      { id: "instinct", label: "Mostly experience and instinct", points: 0 },
      { id: "closest", label: "Whoever is closest to the work", points: 3 },
      { id: "partial", label: "Meetings with partial numbers", points: 7 },
      { id: "shared", label: "Shared metrics the team reviews", points: 10 },
    ],
  }),
  choice({
    id: "ai-before",
    group: "AI and automation",
    dimension: "automation",
    prompt: "Have you implemented AI or automation before?",
    options: [
      { id: "no", label: "Not yet", points: 0 },
      { id: "individual", label: "A few people have tried tools on their own", points: 3 },
      { id: "one", label: "We automated one real workflow", points: 7 },
      { id: "several", label: "We run several workflows with an owner", points: 10 },
    ],
  }),
  choice({
    id: "ai-plan",
    group: "AI and automation",
    dimension: "automation",
    prompt: "Do you have a clear plan for how you use AI and automation given all the options available?",
    options: [
      { id: "no", label: "No plan yet", points: 0 },
      { id: "tools", label: "A list of tools we might try", points: 3 },
      { id: "use-cases", label: "A few use cases, not in order", points: 7 },
      { id: "plan", label: "A plan tied to specific workflows", points: 10 },
    ],
  }),
  choice({
    id: "interest",
    group: "AI and automation",
    prompt: "What's your level of interest in implementing AI and automation in your business?",
    options: [
      { id: "not-now", label: "Not a priority right now", points: 0 },
      { id: "curious", label: "Curious, but not ready to act", points: 0 },
      { id: "pilot", label: "Interested in a focused pilot", points: 0 },
      { id: "ready", label: "Ready to implement", points: 0 },
    ],
  }),
  text({
    id: "company",
    group: "Your business",
    prompt: "What's the name of your company?",
    placeholder: "Company name",
  }),
  text({
    id: "website",
    group: "Your business",
    prompt: "What is your website?",
    placeholder: "https://",
  }),
];

export function isScoredQuestion(
  question: ScorecardQuestion,
): question is ChoiceQuestion & { dimension: DimensionId } {
  return question.kind === "choice" && question.dimension != null;
}

export function isAnswerComplete(question: ScorecardQuestion, value: AnswerValue | undefined): boolean {
  if (question.kind === "multi") {
    return Array.isArray(value) && value.length > 0;
  }
  if (typeof value !== "string" || value.length === 0) return false;
  if (question.kind === "text") return value.trim().length > 0;
  return question.options.some((option) => option.id === value);
}

export function answerLabel(question: ScorecardQuestion, value: AnswerValue | undefined): string {
  if (value == null) return "";
  if (question.kind === "text") return typeof value === "string" ? value.trim() : "";
  if (question.kind === "multi") {
    const ids = Array.isArray(value) ? value : [];
    return ids
      .map((id) => question.options.find((option) => option.id === id)?.label)
      .filter((label): label is string => Boolean(label))
      .join(", ");
  }
  if (typeof value !== "string") return "";
  return question.options.find((option) => option.id === value)?.label ?? "";
}
