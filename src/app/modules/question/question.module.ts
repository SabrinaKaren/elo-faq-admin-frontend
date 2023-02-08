import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { SharedModule } from './../../shared/shared.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { QuestionComponent } from './question.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextareaModule } from 'primeng/inputtextarea';

@NgModule({
  declarations: [
    QuestionComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    ToastModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    SharedModule,
    ToolbarModule,
    ProgressBarModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule
  ],
  exports: [
    QuestionComponent
  ]
})
export class QuestionModule { }