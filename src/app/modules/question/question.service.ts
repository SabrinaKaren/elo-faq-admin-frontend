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
      { question: 'O que é e como visualizo o vale-compra?', answer: 'O vale-compra é a opção de troca, onde o total pago pelo produto devolvido, fica disponível para você realizar uma nova compra.', categoryId: '94189' },
      { question: 'Política de troca e devolução para produtos vendidos pelo Magalu', answer: 'As regras de troca para produtos vendidos e entregues pelo Magalu e por Lojistas Parceiros, são baseadas no artigo 49 do Código de Defesa do Consumidor.', categoryId: '94189' },
      { question: 'Como devolver um smartphone para troca ou cancelamento?', answer: 'Se você precisa solicitar a devolução do aparelho que comprou, é importante desconectar sua conta pessoal nas configurações, antes de devolver o celular pra gente. Assim, você garante a segurança dos seus dados pessoais.', categoryId: '94189' },
      { question: 'Qual é o prazo de troca para produtos Vista Magalu?', answer: 'Se recebeu sua peça Vista Magalu e precisa trocar a cor ou o tamanho, é possível solicitar a troca por um vale-compra,  para fazer uma nova compra do produto que você precisa.', categoryId: '94189' },
      { question: 'Qual o prazo de entrega do meu pedido?', answer: 'Você consegue ver os prazos e os tipos de entrega no seu carrinho de compras. É só clicar no produto desejado, inserir o seu CEP e clicar em Calcular. Você verá as opções de entrega e pode escolher a opção que se encaixa melhor ao seu pedido.', categoryId: '46536' },
      { question: 'Recebi meu pedido com a embalagem danificada. O que devo fazer?', answer: 'Se você recebeu o produto com a embalagem danificada, como caixa rasgada, muito amassada ou aberta, recuse a entrega e coloque uma descrição curta do motivo da devolução.', categoryId: '46536' },
      { question: 'Minha entrega está atrasada. E agora?', answer: 'Se você não recebeu sua compra, primeiro confirme a previsão de entrega em “Meus pedidos”, depois clique em “Ver detalhes”.', categoryId: '46536' },
      { question: 'Como faço para imprimir o boleto?', answer: 'Assim que você finaliza o pedido, a gente envia o boleto por e-mail. Por lá, você pode fazer o download para imprimir.', categoryId: '96007' },
      { question: 'Como conseguir a 2° via da nota fiscal do meu pedido?', answer: 'Se você precisa da 2° via da notal fiscal do pedido, é só seguir os passos: Acesse o site e faça o login; Clique em “Meus pedidos” e depois em “Ver detalhes”; Na linha do tempo do seu pedido, a opção “Sua nota fiscal foi emitida. Aqui está ela”, estará disponível; Clique no link para fazer o download do arquivo.', categoryId: '96007' },
    ];
    this.questionsMock.forEach(item => item.id = this.createId());
  }

  getQuestions(): Observable<any> {
    return of({
      "data": this.questionsMock
    }).pipe(delay(500));
  }

  getQuestionsByCategoryId(categoryId: string): Observable<any> {
    let questionsByCategoryId = this.questionsMock.filter(item => item.categoryId == categoryId);
    return of({
      "data": questionsByCategoryId
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