import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  questionsMock: QuestionModel[];

  constructor() {
    this.questionsMock = [
      { question: 'Como faço para rastrear meu pedido?', answer: 'Você pode acompanhar o seu pedido pelo app ou site.', categoryId: '46536' },
      { question: 'Qual o prazo de aprovação do pedido?', answer: 'O prazo para a aprovação do pedido, depende da forma de pagamento escolhida no momento da compra.', categoryId: '96007' },
      { question: 'O que é e como visualizo o vale-compra?', answer: 'O vale-compra é a opção de troca, onde o total pago pelo produto devolvido, fica disponível para você realizar uma nova compra.', categoryId: '94189' }
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