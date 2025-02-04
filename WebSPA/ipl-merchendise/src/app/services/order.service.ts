import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order, OrderItem } from '../models/order.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = `${environment.apiBaseUrl}/orders`;

  constructor(private http: HttpClient) { }

  getOrders(userId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}?userId=${userId}`);
  }

  getOrderById(orderId: number): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/${orderId}`);
  }

  placeOrder(orderItems: OrderItem[], userId: number): Observable<Order> {
    return this.http.post<Order>(`${this.baseUrl}/users/${userId}`, orderItems);
  }
}
