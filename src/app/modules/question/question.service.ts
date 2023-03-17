import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  endpoint: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpoint = `${environment.apiBaseUrl}/doubt`;
  }

  getQuestions(): Observable<any> {
    return this.http
      .get(this.endpoint)
      .pipe(map( response => response ));
  }

  getQuestionsByCategoryId(categoryId: string): Observable<any> {
    return this.http
      .get(this.endpoint + '/' + categoryId)
      .pipe(map( response => response ));
  }

  createQuestion(question: QuestionModel): Observable<any> {
    return this.http
      .post(this.endpoint, question)
      .pipe(map( response => response ));
  }

  updateQuestion(question: QuestionModel): Observable<any> {
    return this.http
      .put(this.endpoint, question)
      .pipe(map( response => response ));
  }

  deleteQuestion(id: string): Observable<any> {
    return this.http
      .delete(`${this.endpoint}/${id}`)
      .pipe(map( response => response ));
  }

  private createId(): string {
    const length = 5;
    var possibleCharacters = '0123456789';

    var generatedId = '';
    for (let i=0; i<length; i++) {
      generatedId += possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
    }

    return generatedId;
  }

}

export interface QuestionModel {
  id?: string;
  question: string;
  answer: string;
  categoryId: string;
}