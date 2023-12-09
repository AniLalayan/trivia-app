import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {QuestionPageComponent} from "./components/question-page/question-page.component";
import {HomePageComponent} from "./components/home-page/home-page.component";
import {ThankYouPageComponent} from "./components/thank-you-page/thank-you-page.component";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'categories/:id', component: QuestionPageComponent },
  { path: 'thank-you', component: ThankYouPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
