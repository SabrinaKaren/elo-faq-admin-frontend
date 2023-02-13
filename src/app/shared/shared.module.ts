import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './components/loading/loading.component';
import { PrimaryButtonComponent } from './components/primary-button/primary-button.component';

@NgModule({
  declarations: [
    LoadingComponent,
    PrimaryButtonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoadingComponent,
    PrimaryButtonComponent
  ]
})
export class SharedModule { }