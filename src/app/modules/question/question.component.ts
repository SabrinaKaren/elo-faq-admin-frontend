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
  categories: any[] = [];

  // formulário
  questionForm: FormGroup = new FormGroup({
    idControl: new FormControl({value: '', disabled: true}),
    questionControl: new FormControl('', [Validators.required]),
    answerControl: new FormControl('', [Validators.required, Validators.minLength(5)]),
    categoryControl: new FormControl(undefined, [Validators.required, Validators.minLength(1)])
  });

  constructor(
    private service: QuestionService,
    private categoryService: CategoryService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.getQuestions();
    this.getCategoriesToDropdown();
  }

  //******************************************************
  //             Recuperando dados no backend
  //******************************************************

  private getQuestions() {
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

  // Pesquisando e montando a lista para o dropdown de categorias
  private getCategoriesToDropdown() {
    this.categoryService.getCategories().subscribe({
      next: (response) => {
        if (response?.data) {
          this.categories = response.data;
        }
      },
      error: (error) => {
        console.error(error);
        this.messageService.add({
          severity:'error',
          summary: 'Erro',
          detail: 'Erro ao tentar recuperar a lista de categorias',
          life: 3000
        });
      }
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

  private createQuestion() {
    this.loadingCRUD = true;

    this.service.createQuestion({
      question: this.questionForm.get('questionControl')?.value,
      answer: this.questionForm.get('answerControl')?.value,
      categoryId: this.questionForm.get('categoryControl')?.value.id
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

  private updateQuestion() {
    this.loadingCRUD = true;

    this.service.updateQuestion({
      id: this.questionForm.get('idControl')?.value,
      question: this.questionForm.get('questionControl')?.value,
      answer: this.questionForm.get('answerControl')?.value,
      categoryId: this.questionForm.get('categoryControl')?.value.id
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

  private deleteQuestion(question: any) {
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

    // encontrando a categoria na lista de categorias para passar o item para o categoryControl
    const categoryOfThisQuestion = this.categories.find(item => item.id == question.categoryId) ;
    if (categoryOfThisQuestion) this.questionForm.controls['categoryControl'].setValue(categoryOfThisQuestion);
    
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