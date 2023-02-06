import { delay, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }

  getCategories(): Observable<any> {
    return of({
      "data": [
        { "id": "1", "name": "Gerais" },
        { "id": "2", "name": "Login" },
        { "id": "3", "name": "Cadastro" }
      ]
    }).pipe(delay(500));
  }

}