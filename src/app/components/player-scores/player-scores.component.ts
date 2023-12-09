import {Component, Input, OnInit} from '@angular/core';
import {QuizResultsModel} from "../../shared/models/quiz-results.model";

@Component({
  selector: 'app-player-scores',
  templateUrl: './player-scores.component.html',
  styleUrls: ['./player-scores.component.css']
})
export class PlayerScoresComponent implements OnInit {

  @Input() quizResults!: QuizResultsModel[];
  public  panelOpenState = false;

  public ngOnInit() {
    this.quizResults = this.quizResults.reverse(); //to display the latest played game first
  }
}
