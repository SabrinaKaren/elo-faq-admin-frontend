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
    let user: any = this.context.getUserData();
    if (user?.accessToken) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }

}