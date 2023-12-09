import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {HttpDataService} from "../../shared/services/http-data.service";
import {CategoryResponseModel} from "../../shared/models/category-response.model";
import {animate, style, transition, trigger} from "@angular/animations";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
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
export class HomePageComponent implements OnInit {

  public categories: Array<{id: number, name: string}> = [];
  public selectedCategoryId: number | undefined;

  constructor(private httpDataService: HttpDataService,
              private cdr: ChangeDetectorRef,
              private router: Router) {
  }

  public ngOnInit(): void {
    this.httpDataService.getCategories()
      .subscribe((data: CategoryResponseModel) => {
        if (data.trivia_categories.length)
        this.categories = data.trivia_categories;
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error:', error);
      })
  }

  public start() {
    this.router.navigate(['/categories', this.selectedCategoryId]);
  }
}
