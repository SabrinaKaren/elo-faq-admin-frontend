import { QuestionService } from './../question/question.service';
import { CategoryService } from './../category/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-front-office',
  templateUrl: './front-office.component.html',
  styleUrls: ['./front-office.component.css']
})
export class FrontOfficeComponent implements OnInit {

  // controles
  loadingQuestions: boolean = false;

  // data
  categories: { id: string, name: string, active: boolean }[] = [];
  questions: any[] = [];

  constructor(
    private categoryService: CategoryService,
    private questionService: QuestionService
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.getQuestions();
  }

  //******************************************************
  //             Recuperando dados no backend
  //******************************************************

  private getCategories() {
    this.categories = [];

    this.categoryService.getCategories().subscribe({
      next: (response) => {
        if (response?.data) {
          response.data.forEach((category: any) => {
            this.categories.push({
              id: category.id,
              name: category.name,
              active: false
            });
          });
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  private getQuestionsByCategory(categoryId: string) {
    this.loadingQuestions = true;
    this.questions = [];

    this.questionService.getQuestionsByCategoryId(categoryId).subscribe({
      next: (response) => {
        if (response?.data) {
          this.questions = response.data;
        }
      },
      error: (error) => {
        this.loadingQuestions = false;
        console.error(error);
      },
      complete: () => this.loadingQuestions = false
    });
  }

  private getQuestions() {
    this.loadingQuestions = true;
    this.questions = [];

    this.questionService.getQuestions().subscribe({
      next: (response) => {
        if (response?.data) {
          this.questions = response.data;
        }
      },
      error: (error) => {
        this.loadingQuestions = false;
        console.error(error);
      },
      complete: () => this.loadingQuestions = false
    });
  }

  //******************************************************
  //                       Diversos
  //******************************************************

  selectedCategory(index: number): void {
    this.categories.forEach((item: any) => item.active = false);
    this.categories[index].active = true;
    this.getQuestionsByCategory(this.categories[index].id);
  }

}