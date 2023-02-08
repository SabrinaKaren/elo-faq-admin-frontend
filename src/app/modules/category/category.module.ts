import { SharedModule } from './../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryComponent } from './category.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import { RatingModule } from 'primeng/rating';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    CategoryComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    ToastModule,
    ToolbarModule,
    FileUploadModule,
    HttpClientModule,
    RatingModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    DropdownModule,
    ConfirmDialogModule,
    InputTextModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  exports: [
    CategoryComponent
  ]
})
export class CategoryModule { }