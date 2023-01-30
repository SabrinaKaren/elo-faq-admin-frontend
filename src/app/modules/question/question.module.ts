import { QuestionComponent } from './question.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    QuestionComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    QuestionComponent
  ]
})
export class QuestionModule { }