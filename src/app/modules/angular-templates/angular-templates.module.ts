import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularTemplatesComponent } from './angular-templates.component';

@NgModule({
  declarations: [
    AngularTemplatesComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class AngularTemplatesModule { }