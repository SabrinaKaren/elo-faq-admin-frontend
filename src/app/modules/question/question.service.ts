import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  questionsMock: QuestionModel[];

  constructor() {
    this.questionsMock = [
      { question: 'Como logar no sistema?', answer: 'Basta na página de login inserir seu usuário e senha, e depois confirmar no botão.', categoryId: '46536' },
      { question: 'Como me cadastrar no sistema?', answer: 'Basta na página de cadastro preencher o formulário com seus dados, e depois confirmar no botão.', categoryId: '96007' },
      { question: 'É possível encontrar em contato com o suporte?', answer: 'Sim, na página de suporte tem uma lista de opções de formas de contato, basta escolher a melhor para você.', categoryId: '94189' }
    ];
    this.questionsMock.forEach(item => item.id = this.createId());
  }

  getQuestions(): Observable<any> {
    return of({
      "data": this.questionsMock
    }).pipe(delay(500));
  }

  createQuestion(question: QuestionModel): Observable<any> {
    question.id = this.createId(); // adicionando um id
    this.questionsMock.push(question);
    return of({
      "data": this.questionsMock
    }).pipe(delay(500));
  }

  updateQuestion(question: QuestionModel): Observable<any> {
    let questionToDeleteIndex = this.questionsMock.findIndex((item: any) => item.id == question.id);
    if (questionToDeleteIndex > -1) this.questionsMock[questionToDeleteIndex] = question;
    return of({
      "data": this.questionsMock
    }).pipe(delay(500));
  }

  deleteQuestion(id: string): Observable<any> {
    let questionToDeleteIndex = this.questionsMock.findIndex((item: any) => item.id == id);
    if (questionToDeleteIndex > -1) this.questionsMock.splice(questionToDeleteIndex, 1);
    return of({
      "data": this.questionsMock
    }).pipe(delay(500));
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