import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { PageResult } from '../models/page-result.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = `${environment.apiBaseUrl}/products`; 

  constructor(private http: HttpClient) { }

  getProducts(searchText?: string): Observable<PageResult<Product>> {
    var productApi = this.apiUrl;
    if (searchText) {
      productApi = `${this.apiUrl}?searchText=${searchText}`;
    }
    return this.http.get<PageResult<Product>>(productApi);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
}
