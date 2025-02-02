import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { PageResult } from '../models/page-result.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://localhost:7018/api/products'; // Update with your API URL

  constructor(private http: HttpClient) {}

  // Fetch all products with optional filters
  getProducts(searchParams?: any): Observable<PageResult<Product>> {
    return this.http.get<PageResult<Product>>(this.apiUrl, { params: searchParams });
  }

  // Fetch product by ID
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
}
