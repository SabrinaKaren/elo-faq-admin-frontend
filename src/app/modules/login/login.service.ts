import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  login(user: string, password: string): Observable<any> {
    return of({
      "accessToken": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwYWluZWwiLCJpYXQiOjE2NzUzNjE2MjQsImV4cCI6MTY3NTQyMjEwNCwidXNlcm5hbWUiOiJwYWluZWwiLCJuYW1lIjoicGFpbmVsIiwicHJvY3VyYWNhbyI6Ii0xIiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImR0ZVRva2VuIjoiIn0.ugJpUVGyIngrWME-C0dxBG3KlT3-N2GyyMI573ZSL0kWo6EsSqjAbjZMpxdFzMYMQMcUTnqvJKrMQrk18CYUJA"
    }, delay(500));
  }

}