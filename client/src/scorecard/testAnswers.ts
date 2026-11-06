import { isScoredQuestion, questions, type Answers } from "./questions";

export type PointValue = 0 | 3 | 7 | 10;

export function answersFromPoints(
  pointsByQuestion: Record<string, PointValue>,
  extras: Answers = {},
): Answers {
  const answers: Answers = {};

  for (const question of questions) {
    if (!isScoredQuestion(question)) continue;
    const points = pointsByQuestion[question.id];
    if (points == null) {
      throw new Error(`Missing points for scored question ${question.id}`);
    }
    const option = question.options.find((item) => item.points === points);
    if (!option) {
      throw new Error(`${question.id} has no ${points}-point option`);
    }
    answers[question.id] = option.id;
  }

  return { ...answers, ...extras };
}

export function answersAtPoints(points: PointValue, extras: Answers = {}): Answers {
  const pointsByQuestion: Record<string, PointValue> = {};
  for (const question of questions) {
    if (isScoredQuestion(question)) pointsByQuestion[question.id] = points;
  }
  return answersFromPoints(pointsByQuestion, extras);
}

const profileAnswers: Answers = {
  "job-title": "Founder",
  industry: "Home services",
  tasks: ["scheduling", "invoicing"],
  "sales-challenges": ["slow"],
  support: ["email", "phone"],
  company: "Northwind",
  website: "https://northwind.example",
};

export const priorityJourney = answersAtPoints(10, {
  ...profileAnswers,
  revenue: "over-20m",
  headcount: "51-200",
  interest: "ready",
});

export const earlyJourney = answersAtPoints(0, {
  ...profileAnswers,
  "job-title": "Owner",
  revenue: "over-20m",
  headcount: "200-plus",
  industry: "Retail",
  tasks: ["data-entry"],
  "sales-challenges": ["volume"],
  support: ["unset"],
  interest: "not-now",
  company: "Early Co",
  website: "https://early.example",
});
