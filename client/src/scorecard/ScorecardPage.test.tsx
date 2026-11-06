import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { questions, type AnswerValue, type ScorecardQuestion } from "./questions";
import { ScorecardPage } from "./ScorecardPage";
import { formatScore, scoreAnswers } from "./scoring";
import { earlyJourney, priorityJourney } from "./testAnswers";
import type { Answers } from "./scoring";

function renderScorecard() {
  return render(<ScorecardPage discoveryUrl="/book" servicesUrl="/services" />);
}

function answerQuestion(question: ScorecardQuestion, value: AnswerValue) {
  if (question.kind === "text") {
    if (typeof value !== "string") throw new Error(`${question.id} expects text`);
    fireEvent.change(screen.getByRole("textbox"), { target: { value } });
    return;
  }

  if (question.kind === "multi") {
    if (!Array.isArray(value)) throw new Error(`${question.id} expects several answers`);
    for (const optionId of value) {
      const label = question.options.find((option) => option.id === optionId)?.label;
      if (!label) throw new Error(`${question.id} has no option ${optionId}`);
      fireEvent.click(screen.getByRole("checkbox", { name: label }));
    }
    return;
  }

  if (typeof value !== "string") throw new Error(`${question.id} expects one answer`);
  const label = question.options.find((option) => option.id === value)?.label;
  if (!label) throw new Error(`${question.id} has no option ${value}`);
  fireEvent.click(screen.getByRole("radio", { name: label }));
}

async function finishQuiz(user: ReturnType<typeof userEvent.setup>, answers: Answers) {
  for (const [index, question] of questions.entries()) {
    const value = answers[question.id];
    if (value == null) throw new Error(`missing answer for ${question.id}`);
    answerQuestion(question, value);
    await user.click(screen.getByRole("button", { name: index === questions.length - 1 ? "See results" : "Next" }));
  }
}

describe("AI capability test flow", () => {
  it("blocks an unfinished question, keeps answers, and records the start once", async () => {
    const user = userEvent.setup();
    renderScorecard();

    await user.click(screen.getByRole("button", { name: /Start the test/ }));
    expect(screen.getByRole("heading", { name: "What's your job title?" })).toBeInTheDocument();
    expect(screen.getByText("1 of 22")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Next" })).toBeDisabled();

    fireEvent.change(screen.getByRole("textbox"), { target: { value: "   " } });
    expect(screen.getByRole("button", { name: "Next" })).toBeDisabled();

    fireEvent.change(screen.getByRole("textbox"), { target: { value: "Founder" } });
    await user.click(screen.getByRole("button", { name: "Next" }));
    expect(screen.getByRole("heading", { name: "What is your company's annual revenue?" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Next" })).toBeDisabled();

    await user.click(screen.getByRole("button", { name: "Back" }));
    expect(screen.getByRole("heading", { name: "What's your job title?" })).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveValue("Founder");

    await user.click(screen.getByRole("button", { name: "Back" }));
    expect(screen.getByRole("heading", { name: "See whether a pilot is the next step." })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /Start the test/ }));
    expect(screen.getByRole("textbox")).toHaveValue("Founder");
    expect(window.dataLayer).toEqual([{ event: "scorecard_started" }]);
  });

  it("requires at least one diagnostic selection before continuing", async () => {
    const user = userEvent.setup();
    renderScorecard();
    await user.click(screen.getByRole("button", { name: /Start the test/ }));

    for (const question of questions.slice(0, 8)) {
      const value = priorityJourney[question.id];
      if (value == null) throw new Error(`missing answer for ${question.id}`);
      answerQuestion(question, value);
      await user.click(screen.getByRole("button", { name: "Next" }));
    }

    expect(screen.getByRole("heading", { name: "Which tasks take up most of your time?" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Next" })).toBeDisabled();

    await user.click(screen.getByRole("checkbox", { name: "Scheduling and calendar" }));
    expect(screen.getByRole("button", { name: "Next" })).toBeEnabled();
    await user.click(screen.getByRole("checkbox", { name: "Scheduling and calendar" }));
    expect(screen.getByRole("button", { name: "Next" })).toBeDisabled();
  });

  it("shows a priority result and the discovery call after the last question", async () => {
    const user = userEvent.setup();
    renderScorecard();
    await user.click(screen.getByRole("button", { name: /Start the test/ }));
    await finishQuiz(user, priorityJourney);

    const result = scoreAnswers(priorityJourney);
    expect(screen.getByRole("heading", { name: "Ready to optimize" })).toBeInTheDocument();
    expect(screen.getAllByText(formatScore(result.score)).length).toBeGreaterThan(0);
    expect(screen.getByText("A strategy call is timely")).toBeInTheDocument();
    expect(screen.getByText("Northwind")).toBeInTheDocument();
    expect(screen.getByText("Scheduling and calendar, Invoicing and payments")).toBeInTheDocument();
    expect(screen.queryByText("Do you currently use a CRM?")).not.toBeInTheDocument();
    expect(
      screen.getByText(
        "Most of the time goes to Scheduling and calendar and Invoicing and payments. Start with one of those tasks.",
      ),
    ).toBeInTheDocument();
    expect(screen.queryByText(/Customers currently get support/)).not.toBeInTheDocument();

    const discovery = screen.getByRole("link", { name: "Schedule a Discovery Call" });
    const services = screen.getByRole("link", { name: "View Our Services" });
    expect(discovery).toHaveAttribute("href", "/book");
    expect(services).toHaveAttribute("href", "/services");
    discovery.addEventListener("click", (event) => event.preventDefault());
    await user.click(discovery);

    expect(window.dataLayer).toEqual([
      { event: "scorecard_started" },
      { event: "scorecard_completed" },
      { event: "scorecard_results_viewed", qualified: true },
      { event: "discovery_cta_clicked", qualified: true },
    ]);

    await user.click(screen.getByRole("button", { name: "Retake the test" }));
    expect(screen.getByRole("heading", { name: "See whether a pilot is the next step." })).toBeInTheDocument();
    expect(screen.queryByText("Northwind")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Start the test/ }));
    expect(window.dataLayer?.at(-1)).toEqual({ event: "scorecard_started" });
    expect(screen.getByRole("textbox")).toHaveValue("");
  });

  it("shows an early result and services first when a strategy call is premature", async () => {
    const user = userEvent.setup();
    renderScorecard();
    await user.click(screen.getByRole("button", { name: /Start the test/ }));
    await finishQuiz(user, earlyJourney);

    expect(screen.getByRole("heading", { name: "Developing foundation" })).toBeInTheDocument();
    expect(screen.getByText("Stay in touch")).toBeInTheDocument();
    expect(screen.getAllByText("0.0")).toHaveLength(7);
    const services = screen.getByRole("link", { name: "Explore Our Services" });
    const consultation = screen.getByRole("link", { name: "Request a Consultation" });
    expect(services).toHaveAttribute("href", "/services");
    expect(consultation).toHaveAttribute("href", "/book");

    expect(window.dataLayer).toContainEqual({ event: "scorecard_results_viewed", qualified: false });
  });
});
