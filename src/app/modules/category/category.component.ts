import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CategoryService } from './category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class CategoryComponent implements OnInit {

  loading: boolean = false;
  showFormModal: boolean = false;
  submitted: boolean = false;

  categories: any[] = [];
  category: any;
  selectedCategories: any[] = [];

  constructor(
    private service: CategoryService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.loading = true;

    this.service.getCategories().subscribe({
      next: (response) => {
        if (response?.data) {
          this.categories = response.data;
        }
      },
      error: (error) => {
        console.error(error);
        this.loading = false;
      },
      complete: () => this.loading = false
    });
  }

  openNew() {
    this.category = {};
    this.submitted = false;
    this.showFormModal = true;
  }

  deleteSelectedCategories() {
    this.confirmationService.confirm({
      message: 'Você tem certeza de que deseja excluir as categorias selecionadas?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categories = this.categories.filter((val: any) => !this.selectedCategories.includes(val));
        this.selectedCategories = [];
        this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Categorias deletadas', life: 3000});
      }
    });
  }

  editCategory(category: any) {
    this.category = {...category};
    this.showFormModal = true;
  }

  deleteCategory(category: any) {
    this.confirmationService.confirm({
      message: 'Você tem certeza de que deseja excluir ' + category.name + '?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categories = this.categories.filter((val: any) => val.id !== category.id);
        this.category = {};
        this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Categoria deletada', life: 3000});
      }
    });
  }

  hideDialog() {
    this.showFormModal = false;
    this.submitted = false;
  }

  saveCategory() {
    this.submitted = true;

    if (this.category.name.trim()) {
      if (this.category.id) {
        this.categories[this.findIndexById(this.category.id)] = this.category;
        this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Categoria editada', life: 3000});
      }
      else {
        this.category.id = this.createId();
        this.category.image = 'category-placeholder.svg';
        this.categories.push(this.category);
        this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Categoria criada', life: 3000});
      }

      this.categories = [...this.categories];
      this.showFormModal = false;
      this.category = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.categories.length; i++) {
      if (this.categories[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( var i = 0; i < 5; i++ ) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

}