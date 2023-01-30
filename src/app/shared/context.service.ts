import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ContextService {

  readonly __elo_faq_admin_token = '__elo_faq_admin_token';

  constructor(
    private router: Router
  ) { }

  saveUserData(user: any) {
    window.sessionStorage.setItem(this.__elo_faq_admin_token, JSON.stringify(user));
  }

  getUserData(): any {
    let user: any = window.sessionStorage.getItem(this.__elo_faq_admin_token);
    return user ? JSON.parse(user) : undefined;
  }

  logout(): void {
    window.sessionStorage.removeItem(this.__elo_faq_admin_token);
    this.router.navigate(['']);
  }

}