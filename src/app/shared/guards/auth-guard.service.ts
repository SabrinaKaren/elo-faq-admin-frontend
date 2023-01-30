import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ContextService } from '../context.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private context: ContextService
  ) { }

  canActivate(): any {
    let user: any = this.context.getUserData();
    if (user?.accessToken) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }

}