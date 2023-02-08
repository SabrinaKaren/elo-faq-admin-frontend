import { delay, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categoriesMock: any[];

  constructor() {
    this.categoriesMock = [ {"name": "Gerais"}, {"name": "Login"}, {"name": "Cadastro"} ];
    this.categoriesMock.forEach(item => item.id = this.createId());
  }

  getCategories(): Observable<any> {
    return of({
      "data": this.categoriesMock
    }).pipe(delay(500));
  }

  createCategory(category: CategoryModel): Observable<any> {
    category.id = this.createId(); // adicionando um id
    this.categoriesMock.push(category);
    return of({
      "data": this.categoriesMock
    }).pipe(delay(500));
  }

  updateCategory(category: CategoryModel): Observable<any> {
    let categoryToDeleteIndex = this.categoriesMock.findIndex((item: any) => item.id == category.id);
    if (categoryToDeleteIndex > -1) this.categoriesMock[categoryToDeleteIndex] = category;
    return of({
      "data": this.categoriesMock
    }).pipe(delay(500));
  }

  deleteCategory(id: string): Observable<any> {
    let categoryToDeleteIndex = this.categoriesMock.findIndex((item: any) => item.id == id);
    if (categoryToDeleteIndex > -1) this.categoriesMock.splice(categoryToDeleteIndex, 1);
    return of({
      "data": this.categoriesMock
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

export interface CategoryModel {
  id?: string;
  name: string;
}