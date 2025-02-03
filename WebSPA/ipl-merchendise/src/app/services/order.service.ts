import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order, OrderItem } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = 'https://localhost:7018/api/orders'; // Update with actual API URL

  constructor(private http: HttpClient) {}

  // Fetch all orders for a user
  getOrders(userId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/users/${userId}`);
  }

  // Fetch a single order by ID
  getOrderById(orderId: number): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/${orderId}`);
  }

  // Place a new order
  placeOrder(orderItems: OrderItem[],userId:number): Observable<Order> {
    return this.http.post<Order>(`${this.baseUrl}/users/${userId}`, orderItems);
  }
}
