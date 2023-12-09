import {QuestionModel} from "./question.model";

export interface QuestionResponseModel {
  response_code: number,
  results: QuestionModel[]
}
