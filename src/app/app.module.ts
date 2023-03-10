import { FrontOfficeModule } from './modules/front-office/front-office.module';
import { AngularTemplatesModule } from './modules/angular-templates/angular-templates.module';
import { StructuralModule } from './modules/structural/structural.module';
import { QuestionModule } from './modules/question/question.module';
import { LoginModule } from './modules/login/login.module';
import { CategoryModule } from './modules/category/category.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './shared/interceptors/token.interceptor';

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
    QuestionModule,
    AngularTemplatesModule,
    FrontOfficeModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }