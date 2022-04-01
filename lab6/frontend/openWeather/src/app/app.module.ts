import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodayComponent } from './today/today.component';
import { TitleComponent } from './title/title.component';
import { DatabaseComponent } from './database/database.component';
import { Pt3Component } from './pt3/pt3.component';

@NgModule({
  declarations: [
    AppComponent,
    TodayComponent,
    TitleComponent,
    DatabaseComponent,
    Pt3Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
