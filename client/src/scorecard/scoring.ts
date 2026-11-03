import {
  answerLabel,
  dimensions,
  isScoredQuestion,
  questions,
  type Answers,
  type DimensionId,
} from "./questions";

export type { Answers };

export type DimensionScore = {
  id: DimensionId;
  label: string;
  description: string;
  score: number;
};

export type ReadinessBand = {
  id: "foundation" | "momentum" | "optimize";
  title: string;
  summary: string;
};

export type Recommendation = {
  id: DimensionId;
  label: string;
  score: number;
  text: string;
};

export type Qualification = {
  id: "early" | "conversational" | "qualified" | "priority";
  title: string;
  summary: string;
};

export type ScorecardResult = {
  score: number;
  band: ReadinessBand;
  dimensions: DimensionScore[];
  recommendations: Recommendation[];
  diagnosis: string[];
  qualification: Qualification;
};

const bands: ReadinessBand[] = [
  {
    id: "foundation",
    title: "Developing foundation",
    summary:
      "Core habits are still uneven. Give the work an owner and a record before adding more software.",
  },
  {
    id: "momentum",
    title: "Building momentum",
    summary:
      "Parts of the business are repeatable. Keep the next automation inside the gaps below so it has something solid to attach to.",
  },
  {
    id: "optimize",
    title: "Ready to optimize",
    summary:
      "The operating basics are in place. The useful work now is tightening the slow spots, not starting over.",
  },
];

const recommendationText: Record<DimensionId, string> = {
  systems:
    "Make one system the place customer and job records live, and stop using tools that only duplicate that work.",
  operations:
    "Measure one repetitive workflow for a week, then remove a step before you automate it.",
  demand: "Assign every new lead an owner and a first-response target of one minute.",
  customers: "Write down how a customer gets help and which number tells you they stayed.",
  decisions: "Choose three numbers the team will look at together before the next significant decision.",
  automation:
    "Limit the next experiment to one workflow, with a stop or continue rule written in advance.",
};

function roundTenth(value: number): number {
  return Math.round(value * 10) / 10;
}

function bandFor(score: number): ReadinessBand {
  if (score >= 7) return bands[2];
  if (score >= 4) return bands[1];
  return bands[0];
}

function questionPoints(questionId: string, answers: Answers): number {
  const question = questions.find((item) => item.id === questionId);
  if (!question || !isScoredQuestion(question)) return 0;
  const value = answers[questionId];
  if (typeof value !== "string") return 0;
  return question.options.find((option) => option.id === value)?.points ?? 0;
}

function selectedLabels(questionId: string, answers: Answers): string[] {
  const question = questions.find((item) => item.id === questionId);
  if (!question || question.kind !== "multi") return [];
  const value = answers[questionId];
  if (!Array.isArray(value)) return [];
  return value
    .map((id) => question.options.find((option) => option.id === id)?.label)
    .filter((label): label is string => Boolean(label));
}

function joinLabels(labels: string[]): string {
  if (labels.length <= 1) return labels[0] ?? "";
  if (labels.length === 2) return `${labels[0]} and ${labels[1]}`;
  return `${labels.slice(0, -1).join(", ")}, and ${labels[labels.length - 1]}`;
}

function contextNotes(answers: Answers, focus: DimensionId[]): string[] {
  const notes: string[] = [];
  const tasks = selectedLabels("tasks", answers);
  const challenges = selectedLabels("sales-challenges", answers);
  const support = selectedLabels("support", answers);

  if (focus.includes("operations") && tasks.length > 0) {
    notes.push(`Most of the time goes to ${joinLabels(tasks)}. Start with one of those tasks.`);
  }
  if (focus.includes("demand") && challenges.length > 0) {
    notes.push(`The sales pressure you named is ${joinLabels(challenges)}.`);
  }
  if (focus.includes("customers") && support.length > 0) {
    notes.push(`Customers currently get support through ${joinLabels(support)}.`);
  }
  return notes;
}

function qualify(answers: Answers): Qualification {
  const interest = answers.interest;
  const revenue = answers.revenue;
  const headcount = answers.headcount;
  const readyToAct = interest === "pilot" || interest === "ready";
  const established =
    revenue === "1m-5m" ||
    revenue === "5m-20m" ||
    revenue === "over-20m" ||
    headcount === "11-50" ||
    headcount === "51-200" ||
    headcount === "200-plus";
  const earlyCompany = revenue === "under-250k" && headcount === "solo";

  if (interest === "not-now") {
    return {
      id: "early",
      title: "Stay in touch",
      summary: "AI and automation are not a priority yet, so a project would be premature.",
    };
  }
  if (interest === "curious" && earlyCompany) {
    return {
      id: "early",
      title: "Stay in touch",
      summary:
        "Interest is still exploratory, and the company is early. Name one workflow before treating this as a project.",
    };
  }
  if (interest === "ready" && established) {
    return {
      id: "priority",
      title: "A strategy call is timely",
      summary: "There is a clear intent to implement, and the company is large enough for a focused engagement.",
    };
  }
  if (readyToAct) {
    return {
      id: "qualified",
      title: "A strategy call is the right next step",
      summary: "You want to act. Use the call to pick one workflow from the weakest areas, not a list of tools.",
    };
  }
  return {
    id: "conversational",
    title: "A short call would help",
    summary: "There is some interest. A short conversation can tell whether a pilot is timely.",
  };
}

export function formatScore(score: number): string {
  return score.toFixed(1);
}

export function scoreAnswers(answers: Answers): ScorecardResult {
  const scored = questions.filter(isScoredQuestion);
  const rawDimensions = dimensions
    .map((dimension) => {
      const related = scored.filter((question) => question.dimension === dimension.id);
      if (related.length === 0) return null;
      const raw =
        related.reduce((sum, question) => sum + questionPoints(question.id, answers), 0) / related.length;
      return {
        id: dimension.id,
        label: dimension.label,
        description: dimension.description,
        raw,
        score: roundTenth(raw),
      };
    })
    .filter((dimension): dimension is NonNullable<typeof dimension> => dimension != null);

  const overall = roundTenth(
    rawDimensions.reduce((sum, dimension) => sum + dimension.raw, 0) / rawDimensions.length,
  );
  const ranked = [...rawDimensions].sort((a, b) => {
    if (a.raw !== b.raw) return a.raw - b.raw;
    return dimensions.findIndex((item) => item.id === a.id) - dimensions.findIndex((item) => item.id === b.id);
  });
  const recommendations: Recommendation[] = ranked.slice(0, 3).map((dimension) => ({
    id: dimension.id,
    label: dimension.label,
    score: dimension.score,
    text: recommendationText[dimension.id],
  }));
  const focus = recommendations.map((item) => item.id);
  const band = bandFor(overall);
  const diagnosis = [
    band.summary,
    ...contextNotes(answers, focus),
    ...recommendations.map(
      (item) => `${item.label}, ${formatScore(item.score)} out of 10. ${item.text}`,
    ),
  ];

  return {
    score: overall,
    band,
    dimensions: rawDimensions.map(({ raw: _raw, ...dimension }) => dimension),
    recommendations,
    diagnosis,
    qualification: qualify(answers),
  };
}

export function profileAnswers(answers: Answers) {
  return questions
    .filter((question) => !isScoredQuestion(question))
    .map((question) => ({
      id: question.id,
      prompt: question.prompt,
      value: answerLabel(question, answers[question.id]),
    }))
    .filter((item) => item.value.length > 0);
}
