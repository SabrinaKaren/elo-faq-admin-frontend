import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ContextService } from '../context.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate {

  constructor(
    private router: Router,
    private context: ContextService
  ) { }

  canActivate(): any {
    let user: any = this.context.getUserData();
    if (user?.accessToken) {
      this.router.navigate(['']);
      return false;
    } else {
      return true;
    }
  }

}