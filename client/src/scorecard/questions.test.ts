import { describe, expect, it } from "vitest";
import { answerLabel, isAnswerComplete, isScoredQuestion, questions } from "./questions";

describe("scorecard question paths", () => {
  it("keeps company details and diagnostic answers out of the score", () => {
    expect(questions.filter(isScoredQuestion).map((question) => question.id)).toEqual([
      "crm",
      "tools",
      "stack",
      "hours",
      "leads",
      "response",
      "pipeline",
      "satisfaction",
      "dashboard",
      "decisions",
      "ai-before",
      "ai-plan",
    ]);
    expect(questions.filter((question) => !isScoredQuestion(question)).map((question) => question.id)).toEqual([
      "job-title",
      "revenue",
      "headcount",
      "industry",
      "tasks",
      "sales-challenges",
      "support",
      "interest",
      "company",
      "website",
    ]);
  });

  it("accepts an answer only when the current question can move forward", () => {
    const text = questions.find((question) => question.id === "job-title");
    const choice = questions.find((question) => question.id === "revenue");
    const multi = questions.find((question) => question.id === "tasks");
    if (!text || !choice || !multi) throw new Error("expected scorecard questions");

    expect(isAnswerComplete(text, undefined)).toBe(false);
    expect(isAnswerComplete(text, "   ")).toBe(false);
    expect(isAnswerComplete(text, "Founder")).toBe(true);

    expect(isAnswerComplete(choice, "missing")).toBe(false);
    expect(isAnswerComplete(choice, "under-250k")).toBe(true);

    expect(isAnswerComplete(multi, [])).toBe(false);
    expect(isAnswerComplete(multi, "scheduling")).toBe(false);
    expect(isAnswerComplete(multi, ["scheduling"])).toBe(true);
  });

  it("labels stored answers for the results profile", () => {
    const revenue = questions.find((question) => question.id === "revenue");
    const support = questions.find((question) => question.id === "support");
    const company = questions.find((question) => question.id === "company");
    if (!revenue || !support || !company) throw new Error("expected scorecard questions");

    expect(answerLabel(revenue, "1m-5m")).toBe("$1 million to $5 million");
    expect(answerLabel(support, ["email", "missing", "phone"])).toBe("Email, Phone");
    expect(answerLabel(company, "  Northwind  ")).toBe("Northwind");
  });
});
