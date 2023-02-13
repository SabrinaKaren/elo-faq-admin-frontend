import { AngularTemplatesComponent } from './modules/angular-templates/angular-templates.component';
import { LogoutComponent } from './modules/logout/logout.component';
import { LoginGuardService } from './shared/guards/login-guard.service';
import { QuestionComponent } from './modules/question/question.component';
import { CategoryComponent } from './modules/category/category.component';
import { MainStructureComponent } from './modules/structural/main-structure/main-structure.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { AuthGuardService } from './shared/guards/auth-guard.service';
import { AuthGuardChildService } from './shared/guards/auth-guard-child.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [LoginGuardService] },
  { path: 'logout', component: LogoutComponent },
  {
    path: '', component: MainStructureComponent, canActivate: [AuthGuardService], canActivateChild: [AuthGuardChildService],
    children: [
      { path: 'categoria', component: CategoryComponent },
      { path: 'duvida', component: QuestionComponent }
    ]
  },
  { path: 'angular-templates', component: AngularTemplatesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }