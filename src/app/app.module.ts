import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ThankYouPageComponent } from './components/thank-you-page/thank-you-page.component';
import { QuestionPageComponent } from './components/question-page/question-page.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {HttpDataService} from "./shared/services/http-data.service";
import {HttpClientModule} from "@angular/common/http";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatButtonModule} from "@angular/material/button";
import {CapitalizePipe} from "./shared/pipes/capitalize.pipe";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {FormsModule} from "@angular/forms";
import {MatExpansionModule} from "@angular/material/expansion";
import { PlayerScoresComponent } from './components/player-scores/player-scores.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ThankYouPageComponent,
    QuestionPageComponent,
    CapitalizePipe,
    PlayerScoresComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatAutocompleteModule,
    FormsModule,
    MatExpansionModule,
  ],
  providers: [HttpDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
