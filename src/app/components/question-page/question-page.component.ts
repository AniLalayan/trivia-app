import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpDataService} from "../../shared/services/http-data.service";
import {QuestionResponseModel} from "../../shared/models/question-response.model";
import {QuestionModel} from "../../shared/models/question.model";
import {StatusEnum} from "../../shared/status.enum";
import {trigger, transition, style, animate, query, stagger, state, keyframes, sequence} from '@angular/animations';
import {QuestionTableRowModel} from "../../shared/models/question-table-row.model";
import {QuizResultsModel} from "../../shared/models/quiz-results.model";

@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionPageComponent implements OnInit {

  public questions: QuestionModel[] | undefined;
  public currentQuestion: QuestionModel | undefined;
  public currentIndex: number = 0;
  public answers: string[] = [];
  public score: number = 0;
  public questionData: QuestionTableRowModel[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private httpDataService: HttpDataService,
              private cdr: ChangeDetectorRef) {
  }

  public ngOnInit() {
    const categoryId = this.route.snapshot.paramMap.get('id');
    if (!categoryId) return;
    this.httpDataService.getQuestionsByCategoryId(+categoryId)
      .subscribe(
        (data: QuestionResponseModel) => {
          if (data.results.length) {
            this.questions = data.results;
            this.currentQuestion = this.questions![this.currentIndex];
            this.setQuestionAnswers();
            this.cdr.detectChanges();
          }
        },
        (error) => {
          console.error('Error:', error);
        }
      );
  }

  public applyStatusColor(status: string) {
    switch (status) {
      case StatusEnum.easy:
        return '#42A976';
      case StatusEnum.medium:
        return '#EAC505';
      case StatusEnum.hard:
        return '#EF7D54';
    }
    return null;
  }

  public setQuestionAnswers() {
    this.answers = [...this.currentQuestion!.incorrect_answers,
                    this.currentQuestion!.correct_answer].sort();
    // Քանի որ api-ից ստանում ենք incorrect_answers և correct_answer-ները առանձին,
    // դրանք լցնում եմ մի զանգվացի մեջ
    // ու սորթավորում, որպեսզի չստացվի, որ ճիշտ պատասխանը միշտ վերջին տարբերակն է։
  }

  public checkAnswer(userAnswer: any) {
    if (userAnswer === this.currentQuestion!.correct_answer) {
      ++this.score;
    }
    this.setQuestionDataForResult(userAnswer, this.currentQuestion!);
    if (this.currentIndex === this.questions!.length - 1) {
      this.endQuiz();
      return;
    }
    this.updateCurrentQuestion();
  }

  public updateCurrentQuestion() {
    ++this.currentIndex;
    this.currentQuestion = this.questions![this.currentIndex];
    this.setQuestionAnswers();
    this.cdr.markForCheck();
  }

  public setQuestionDataForResult(userAnswer: string, currentQuestion: QuestionModel) {
    let data: QuestionTableRowModel = {
      question:  currentQuestion.question,
      userAnswer: userAnswer,
      correctAnswer: currentQuestion.correct_answer
    };
    this.questionData.push(data);
  }

  public endQuiz() {
    let quizResults: QuizResultsModel = {
      score: this.score,
      questionData: this.questionData
    };
    const oldResults = localStorage.getItem('quizResults');
    const newResults = [];
    newResults.push(...(oldResults ? JSON.parse(oldResults) : []), quizResults);
    localStorage.setItem('quizResults', JSON.stringify(newResults));
    this.router.navigate(['/thank-you']);
  }
}
