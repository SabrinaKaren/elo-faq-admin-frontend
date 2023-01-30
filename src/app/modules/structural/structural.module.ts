import { MainStructureComponent } from './main-structure/main-structure.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    MainStructureComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class StructuralModule { }