import { Injectable } from '@angular/core';
import { CanActivateChild, Router } from '@angular/router';
import { ContextService } from '../context.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardChildService implements CanActivateChild {

  constructor(
    private router: Router,
    private context: ContextService
  ) { }
  
  canActivateChild(): any {
    if (this.context.getUserData()) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }

}