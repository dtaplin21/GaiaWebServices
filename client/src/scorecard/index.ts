export { ScorecardPage, default } from "./ScorecardPage";
export { ScorecardCTA } from "./ScorecardCTA";
export { trackScorecardEvent } from "./analytics";
export { answerLabel, dimensions, isAnswerComplete, isScoredQuestion, questions } from "./questions";
export { formatScore, profileAnswers, scoreAnswers } from "./scoring";
export type {
  Answers,
  DimensionScore,
  Qualification,
  ReadinessBand,
  Recommendation,
  ScorecardResult,
} from "./scoring";
