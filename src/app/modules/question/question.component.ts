import { QuestionService } from './question.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CategoryService } from '../category/category.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService, ConfirmationService]
})
export class QuestionComponent implements OnInit {

  // controles
  loading: boolean = false;
  loadingCRUD: boolean = false;
  showFormModal: boolean = false;

  // dados
  questions: any[] = [];
  selectedQuestions: any[] = [];

  // formulário
  questionForm: FormGroup = new FormGroup({
    idControl: new FormControl({value: '', disabled: true}),
    questionControl: new FormControl('', [Validators.required, Validators.minLength(5)]),
    answerControl: new FormControl('', [Validators.required, Validators.minLength(5)]),
    categoryIdControl: new FormControl('', [Validators.required, Validators.minLength(1)])
  });

  constructor(
    private service: QuestionService,
    private categoryService: CategoryService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.getQuestions();
  }

  //******************************************************
  //             Recuperando dados no backend
  //******************************************************

  getQuestions() {
    this.loading = true;

    this.service.getQuestions().subscribe({
      next: (response) => {
        if (response?.data) {
          this.questions = response.data;
        }
      },
      error: (error) => {
        this.loading = false;
        console.error(error);
        this.messageService.add({
          severity:'error',
          summary: 'Erro',
          detail: 'Erro ao tentar recuperar a lista de dúvidas',
          life: 3000
        });
      },
      complete: () => this.loading = false
    });
  }

  //******************************************************
  //                  Operações de CRUD
  //******************************************************

  saveQuestion() {
    if (this.questionForm.valid) {

      // se possuir id, significa que é update
      if (this.questionForm.get('idControl')?.value) this.updateQuestion();

      // se não possuir id, significa que é create
      else this.createQuestion();

      this.showFormModal = false;
      this.questionForm.reset();

    }
  }

  createQuestion() {
    this.loadingCRUD = true;

    this.service.createQuestion({
      question: this.questionForm.get('questionControl')?.value,
      answer: this.questionForm.get('answerControl')?.value,
      categoryId: this.questionForm.get('categoryIdControl')?.value
    }).subscribe({
      next: (response) => {
        if (response?.data) {
          this.questions = response.data;
          this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Dúvida criada', life: 3000});
        }
      },
      error: (error) => {
        this.loadingCRUD = false;

        console.error(error);
        this.messageService.add({
          severity:'error',
          summary: 'Erro',
          detail: `Erro ao tentar criar a dúvida '${this.questionForm.get('questionControl')?.value}'`,
          life: 3000
        });
      },
      complete: () => this.loadingCRUD = false
    });
  }

  updateQuestion() {
    this.loadingCRUD = true;

    this.service.updateQuestion({
      id: this.questionForm.get('idControl')?.value,
      question: this.questionForm.get('questionControl')?.value,
      answer: this.questionForm.get('answerControl')?.value,
      categoryId: this.questionForm.get('categoryIdControl')?.value
    }).subscribe({
      next: (response) => {
        if (response?.data) {
          this.questions = response.data;
          this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Dúvida editada', life: 3000});
        }
      },
      error: (error) => {
        this.loadingCRUD = false;

        console.error(error);
        this.messageService.add({
          severity:'error',
          summary: 'Erro',
          detail: `Erro ao tentar atualizar a dúvida de id '${this.questionForm.get('idControl')?.value}'`,
          life: 3000
        });
      },
      complete: () => this.loadingCRUD = false
    });
  }

  deleteQuestion(question: any) {
    this.loadingCRUD = true;

    this.service.deleteQuestion(question.id).subscribe({
      next: (response) => {
        if (response?.data) {
          this.questions = response.data;
          this.messageService.add({severity:'success', summary: 'Sucesso', detail: `A dúvida de id '${question.id}' foi deletada`, life: 3000});
        }
      },
      error: (error) => {
        this.loadingCRUD = false;

        console.error(error);
        this.messageService.add({
          severity:'error',
          summary: 'Erro',
          detail: `Erro ao tentar deletar a dúvida de id '${question.id}'`,
          life: 3000
        });
      },
      complete: () => this.loadingCRUD = false
    });
  }

  //******************************************************
  //               Controles do formulário
  //******************************************************

  preparationNewQuestion() {
    this.questionForm.reset();
    this.showFormModal = true;
  }

  preparationEditQuestion(question: any) {
    this.questionForm.controls['idControl'].setValue(question.id);
    this.questionForm.controls['questionControl'].setValue(question.question);
    this.questionForm.controls['answerControl'].setValue(question.answer);
    this.questionForm.controls['categoryIdControl'].setValue(question.categoryId);
    this.showFormModal = true;
  }

  preparationDeleteSelectedQuestions() {
    this.confirmationService.confirm({
      message: 'Você tem certeza de que deseja excluir as dúvidas selecionadas?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.selectedQuestions.forEach(item => this.deleteQuestion(item));
        this.selectedQuestions = [];
      }
    });
  }

  preparationDeleteQuestion(question: any) {
    this.confirmationService.confirm({
      message: `Você tem certeza de que deseja excluir a dúvida de id '${question.id}'?`,
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteQuestion(question);
        this.questionForm.reset();
      }
    });
  }

}