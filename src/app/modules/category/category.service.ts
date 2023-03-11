import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  endpoint: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpoint = `${environment.apiBaseUrl}/category`;
  }

  getCategories(): Observable<any> {
    return this.http
      .get(this.endpoint)
      .pipe(map( response => response ));
  }

  createCategory(category: CategoryModel): Observable<any> {
    return this.http
      .post(this.endpoint, { name: category.name })
      .pipe(map( response => response ));
  }

  updateCategory(category: CategoryModel): Observable<any> {
    return this.http
      .put(this.endpoint, { name: category.name, id: category.id })
      .pipe(map( response => response ));
  }

  deleteCategory(id: string): Observable<any> {
    return this.http
      .delete(`${this.endpoint}/${id}`)
      .pipe(map( response => response ));
  }

}

export interface CategoryModel {
  id?: string;
  name: string;
}