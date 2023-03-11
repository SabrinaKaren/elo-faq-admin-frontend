import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient
  ) { }

  login(user: string, password: string): Observable<any> {
    return this.http
      .post(
        `${environment.apiBaseUrl}/auth/authenticate`,
        { email: user, password }
      ).pipe(map( response => response ));
  }

}