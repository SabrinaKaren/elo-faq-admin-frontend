import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  login(user: string, password: string): Observable<any> {
    return of({}, delay(500));
  }

}