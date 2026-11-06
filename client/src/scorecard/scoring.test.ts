import { describe, expect, it } from "vitest";
import { formatScore, profileAnswers, scoreAnswers } from "./scoring";
import { answersAtPoints, answersFromPoints } from "./testAnswers";

const qualificationTitles = {
  early: "Stay in touch",
  conversational: "A short call would help",
  qualified: "A strategy call is the right next step",
  priority: "A strategy call is timely",
} as const;

describe("qualification paths", () => {
  it.each([
    ["not-now", "over-20m", "200-plus", "early"],
    ["not-now", undefined, undefined, "early"],
    ["curious", "under-250k", "solo", "early"],
    ["curious", "under-250k", "2-10", "conversational"],
    ["curious", "250k-1m", "solo", "conversational"],
    ["curious", "1m-5m", "11-50", "conversational"],
    ["ready", "1m-5m", "solo", "priority"],
    ["ready", "5m-20m", "2-10", "priority"],
    ["ready", "over-20m", "solo", "priority"],
    ["ready", "under-250k", "11-50", "priority"],
    ["ready", "under-250k", "51-200", "priority"],
    ["ready", "250k-1m", "200-plus", "priority"],
    ["ready", "under-250k", "solo", "qualified"],
    ["ready", "250k-1m", "2-10", "qualified"],
    ["pilot", "over-20m", "200-plus", "qualified"],
    ["pilot", "under-250k", "solo", "qualified"],
  ] as const)(
    "interest %s, revenue %s, headcount %s follows %s",
    (interest, revenue, headcount, qualification) => {
      const result = scoreAnswers(
        answersAtPoints(0, {
          ...(interest ? { interest } : {}),
          ...(revenue ? { revenue } : {}),
          ...(headcount ? { headcount } : {}),
        }),
      );

      expect(result.qualification.id).toBe(qualification);
      expect(result.qualification.title).toBe(qualificationTitles[qualification]);
    },
  );

  it("stays conversational when interest was not answered", () => {
    expect(scoreAnswers({}).qualification.id).toBe("conversational");
  });
});

describe("readiness bands", () => {
  it("stays in foundation when the rounded score is below 4", () => {
    const result = scoreAnswers(
      answersFromPoints({
        crm: 0,
        tools: 0,
        stack: 0,
        hours: 0,
        leads: 0,
        response: 0,
        pipeline: 0,
        satisfaction: 7,
        dashboard: 3,
        decisions: 10,
        "ai-before": 10,
        "ai-plan": 10,
      }),
    );

    expect(result.score).toBe(3.9);
    expect(result.band.id).toBe("foundation");
    expect(result.band.title).toBe("Developing foundation");
  });

  it("enters momentum at a rounded score of 4", () => {
    const result = scoreAnswers(
      answersFromPoints({
        crm: 0,
        tools: 0,
        stack: 0,
        hours: 0,
        leads: 0,
        response: 0,
        pipeline: 0,
        satisfaction: 7,
        dashboard: 7,
        decisions: 7,
        "ai-before": 10,
        "ai-plan": 10,
      }),
    );

    expect(result.score).toBe(4);
    expect(result.band.id).toBe("momentum");
    expect(result.band.title).toBe("Building momentum");
  });

  it("stays in momentum just below 7", () => {
    const result = scoreAnswers(
      answersFromPoints({
        crm: 0,
        tools: 0,
        stack: 0,
        hours: 3,
        leads: 10,
        response: 10,
        pipeline: 10,
        satisfaction: 10,
        dashboard: 7,
        decisions: 10,
        "ai-before": 10,
        "ai-plan": 10,
      }),
    );

    expect(result.score).toBe(6.9);
    expect(result.band.id).toBe("momentum");
  });

  it("enters optimize at 7 and at a perfect score", () => {
    expect(scoreAnswers(answersAtPoints(7)).band).toMatchObject({
      id: "optimize",
      title: "Ready to optimize",
    });
    expect(scoreAnswers(answersAtPoints(7)).score).toBe(7);
    expect(scoreAnswers(answersAtPoints(10)).score).toBe(10);
    expect(scoreAnswers(answersAtPoints(10)).band.id).toBe("optimize");
    expect(formatScore(10)).toBe("10.0");
  });
});

describe("scoreAnswers", () => {
  it("ignores profile and diagnostic answers when calculating the number", () => {
    const scored = answersAtPoints(7);
    const withProfile = answersAtPoints(7, {
      "job-title": "Founder",
      revenue: "over-20m",
      headcount: "200-plus",
      industry: "Retail",
      tasks: ["scheduling", "invoicing", "data-entry"],
      "sales-challenges": ["slow", "cold"],
      support: ["email"],
      interest: "ready",
      company: "Northwind",
      website: "https://northwind.example",
    });

    const withoutProfile = scoreAnswers(scored);
    const withContext = scoreAnswers(withProfile);

    expect(withContext.score).toBe(withoutProfile.score);
    expect(withContext.dimensions).toEqual(withoutProfile.dimensions);
    expect(withContext.qualification.id).toBe("priority");
    expect(withoutProfile.qualification.id).toBe("conversational");
  });

  it("recommends the three weakest areas, using dimension order as the tie break", () => {
    const result = scoreAnswers(answersAtPoints(10));

    expect(result.recommendations.map((item) => item.id)).toEqual(["systems", "operations", "demand"]);
    expect(result.recommendations.map((item) => item.score)).toEqual([10, 10, 10]);
  });

  it("builds the diagnosis from the band, the focused context, and the weakest areas", () => {
    const result = scoreAnswers(
      answersFromPoints(
        {
          crm: 10,
          tools: 0,
          stack: 3,
          hours: 3,
          leads: 7,
          response: 3,
          pipeline: 3,
          satisfaction: 3,
          dashboard: 7,
          decisions: 3,
          "ai-before": 3,
          "ai-plan": 7,
        },
        {
          tasks: ["scheduling", "invoicing", "data-entry"],
          "sales-challenges": ["slow"],
          support: ["email", "phone"],
        },
      ),
    );

    expect(result.score).toBe(4.1);
    expect(result.dimensions.map((dimension) => [dimension.id, dimension.score])).toEqual([
      ["systems", 4.3],
      ["operations", 3],
      ["demand", 4.3],
      ["customers", 3],
      ["decisions", 5],
      ["automation", 5],
    ]);
    expect(result.recommendations.map((item) => item.id)).toEqual(["operations", "customers", "systems"]);
    expect(result.diagnosis).toEqual([
      result.band.summary,
      "Most of the time goes to Scheduling and calendar, Invoicing and payments, and Data entry. Start with one of those tasks.",
      "Customers currently get support through Email and Phone.",
      "Operations, 3.0 out of 10. Measure one repetitive workflow for a week, then remove a step before you automate it.",
      "Customers, 3.0 out of 10. Write down how a customer gets help and which number tells you they stayed.",
      "Systems, 4.3 out of 10. Make one system the place customer and job records live, and stop using tools that only duplicate that work.",
    ]);
    expect(result.diagnosis.join(" ")).not.toContain("Slow follow-up");
  });

  it("lists only answered profile questions, in question order", () => {
    const profile = profileAnswers(
      answersAtPoints(0, {
        website: "  ",
        company: "Northwind",
        "job-title": "Founder",
        tasks: ["reporting"],
      }),
    );

    expect(profile.map((item) => item.id)).toEqual(["job-title", "tasks", "company"]);
    expect(profile.map((item) => item.value)).toEqual(["Founder", "Reporting", "Northwind"]);
  });
});
