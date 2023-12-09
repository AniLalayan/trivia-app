import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";
import {QuizResultsModel} from "../../shared/models/quiz-results.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-thank-you-page',
  templateUrl: './thank-you-page.component.html',
  styleUrls: ['./thank-you-page.component.css'],
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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThankYouPageComponent implements OnInit {

  public score: number | undefined;
  public totalQuestionsCount: number | undefined;
  public scores: number[] = [];
  public quizResults: QuizResultsModel[] = [];

  constructor(private router: Router) {
  }

  public ngOnInit() {
    this.quizResults = JSON.parse(localStorage.getItem('quizResults')!);
    const lastResult = this.quizResults[this.quizResults.length - 1];
    this.score = lastResult.score;
    this.totalQuestionsCount = lastResult.questionData.length;
  }

  public navigateToHomePage() {
    this.router.navigate(['/'])
  }
}
