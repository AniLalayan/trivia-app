import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {QuestionResponseModel} from "../models/question-response.model";
import {CategoryResponseModel} from "../models/category-response.model";

@Injectable()

export class HttpDataService {

  private readonly API_URL = 'https://opentdb.com/';

  public constructor(private http: HttpClient) {}

  public getCategories(): Observable<CategoryResponseModel> {
    return this.http.get(`${this.API_URL}api_category.php`) as Observable<CategoryResponseModel>;
  }

  public getQuestionsByCategoryId(categoryId: number): Observable<QuestionResponseModel> {
    return this.http.get(`${this.API_URL}api.php?amount=10&category=${categoryId}`) as Observable<QuestionResponseModel>;
  }

}
