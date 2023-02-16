import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontOfficeComponent } from './front-office.component';
import { AccordionModule } from 'primeng/accordion';

@NgModule({
  declarations: [
    FrontOfficeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AccordionModule
  ]
})
export class FrontOfficeModule { }