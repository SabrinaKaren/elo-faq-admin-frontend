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
    if (this.context.getUserData()) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }

}