import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { PageResult } from '../models/page-result.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://localhost:7018/api/products'; // Update with your API URL

  constructor(private http: HttpClient) { }

  // Fetch all products with optional filters
  getProducts(searchText?: string): Observable<PageResult<Product>> {
    var productApi = this.apiUrl;
    if (searchText) {
      productApi = `${this.apiUrl}?searchText=${searchText}`;
    }
    return this.http.get<PageResult<Product>>(productApi);
  }

  // Fetch product by ID
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
}
