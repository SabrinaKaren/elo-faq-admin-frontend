import { StructuralModule } from './modules/structural/structural.module';
import { QuestionModule } from './modules/question/question.module';
import { LoginModule } from './modules/login/login.module';
import { CategoryModule } from './modules/category/category.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StructuralModule,
    CategoryModule,
    LoginModule,
    QuestionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }