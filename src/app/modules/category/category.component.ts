import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CategoryService } from './category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService, ConfirmationService]
})
export class CategoryComponent implements OnInit {

  // controles
  loading: boolean = false;
  loadingCRUD: boolean = false;
  showFormModal: boolean = false;

  // dados
  categories: any[] = [];
  selectedCategories: any[] = [];

  // formulário
  categoryForm: FormGroup = new FormGroup({
    idControl: new FormControl({value: '', disabled: true}),
    nameControl: new FormControl('', [Validators.required, Validators.minLength(3)])
  });

  constructor(
    private service: CategoryService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.getCategories();
  }

  //******************************************************
  //             Recuperando dados no backend
  //******************************************************

  private getCategories() {
    this.loading = true;

    this.service.getCategories().subscribe({
      next: (response) => {
        if (response?.data) {
          this.categories = response.data;
        }
      },
      error: (error) => {
        this.loading = false;
        console.error(error);
        this.messageService.add({
          severity:'error',
          summary: 'Erro',
          detail: 'Erro ao tentar recuperar a lista de categorias',
          life: 3000
        });
      },
      complete: () => this.loading = false
    });
  }

  //******************************************************
  //                  Operações de CRUD
  //******************************************************

  saveCategory() {
    if (this.categoryForm.valid) {

      // se possuir id, significa que é update
      if (this.categoryForm.get('idControl')?.value) this.updateCategory();

      // se não possuir id, significa que é create
      else this.createCategory();

      this.showFormModal = false;
      this.categoryForm.reset();

    }
  }

  private createCategory() {
    this.loadingCRUD = true;

    this.service.createCategory({
      name: this.categoryForm.get('nameControl')?.value
    }).subscribe({
      next: (response) => {
        if (response?.data) {
          this.getCategories();
          this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Categoria criada', life: 3000});
        }
      },
      error: (error) => {
        this.loadingCRUD = false;

        console.error(error);
        this.messageService.add({
          severity:'error',
          summary: 'Erro',
          detail: `Erro ao tentar criar a categoria '${this.categoryForm.get('nameControl')?.value}'`,
          life: 3000
        });
      },
      complete: () => this.loadingCRUD = false
    });
  }

  private updateCategory() {
    this.loadingCRUD = true;

    this.service.updateCategory({
      id: this.categoryForm.get('idControl')?.value,
      name: this.categoryForm.get('nameControl')?.value
    }).subscribe({
      next: (response) => {
        if (response?.data) {
          this.getCategories();
          this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Categoria editada', life: 3000});
        }
      },
      error: (error) => {
        this.loadingCRUD = false;

        console.error(error);
        this.messageService.add({
          severity:'error',
          summary: 'Erro',
          detail: `Erro ao tentar atualizar a categoria '${this.categoryForm.get('nameControl')?.value}'`,
          life: 3000
        });
      },
      complete: () => this.loadingCRUD = false
    });
  }

  private deleteCategory(category: any) {
    this.loadingCRUD = true;

    this.service.deleteCategory(category.id).subscribe({
      next: (response) => {
        if (response?.data) {
          this.getCategories();
          this.messageService.add({severity:'success', summary: 'Sucesso', detail: `A categoria '${category.name}' foi deletada`, life: 3000});
        }
      },
      error: (error) => {
        this.loadingCRUD = false;

        console.error(error);
        this.messageService.add({
          severity:'error',
          summary: 'Erro',
          detail: `Erro ao tentar deletar a categoria '${category.name}'`,
          life: 3000
        });
      },
      complete: () => this.loadingCRUD = false
    });
  }

  //******************************************************
  //               Controles do formulário
  //******************************************************

  preparationNewCategory() {
    this.categoryForm.reset();
    this.showFormModal = true;
  }

  preparationEditCategory(category: any) {
    this.categoryForm.controls['idControl'].setValue(category.id);
    this.categoryForm.controls['nameControl'].setValue(category.name);
    this.showFormModal = true;
  }

  preparationDeleteSelectedCategories() {
    this.confirmationService.confirm({
      message: 'Você tem certeza de que deseja excluir as categorias selecionadas?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.selectedCategories.forEach(item => this.deleteCategory(item));
        this.selectedCategories = [];
      }
    });
  }

  preparationDeleteCategory(category: any) {
    this.confirmationService.confirm({
      message: `Você tem certeza de que deseja excluir a categoria '${category.name}'?`,
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteCategory(category);
        this.categoryForm.reset();
      }
    });
  }

}