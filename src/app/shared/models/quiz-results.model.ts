import {QuestionTableRowModel} from "./question-table-row.model";

export interface QuizResultsModel {
  score: number;
  questionData: QuestionTableRowModel[];
}
