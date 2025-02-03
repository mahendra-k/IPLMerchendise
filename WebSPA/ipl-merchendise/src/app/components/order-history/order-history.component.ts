import { Component, OnInit } from '@angular/core';
import { CurrencyPipe,DatePipe,NgFor,NgIf } from '@angular/common';

interface OrderItem {
  productName: string;
  quantity: number;
  price: number;
}

interface Order {
  orderId: number;
  date: string;
  totalPrice: number;
  status: string;
  items: OrderItem[];
}

@Component({
  selector: 'app-order-history',
  imports: [CurrencyPipe, DatePipe, NgFor,NgIf],
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {
  orders: Order[] = [
    {
      orderId: 101,
      date: '2024-02-01T10:15:00',
      totalPrice: 2500,
      status: 'Pending',
      items: [
        { productName: 'Jersey', quantity: 1, price: 1500 },
        { productName: 'Cap', quantity: 2, price: 500 }
      ]
    },
    {
      orderId: 102,
      date: '2024-01-28T14:30:00',
      totalPrice: 1800,
      status: 'Shipped',
      items: [
        { productName: 'Flag', quantity: 3, price: 600 },
        { productName: 'Autographed Photo', quantity: 1, price: 1200 }
      ]
    },
    {
      orderId: 103,
      date: '2024-01-22T09:45:00',
      totalPrice: 3200,
      status: 'Delivered',
      items: [
        { productName: 'Hoodie', quantity: 1, price: 3200 }
      ]
    },
    {
      orderId: 104,
      date: '2024-01-15T18:10:00',
      totalPrice: 1500,
      status: 'Cancelled',
      items: [
        { productName: 'Mug', quantity: 2, price: 1500 }
      ]
    }
  ];

  expandedOrder: Order | null = null; // Store expanded order object
  constructor() { }

  ngOnInit(): void { }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Pending':
        return 'status-pending';
      case 'Shipped':
        return 'status-shipped';
      case 'Delivered':
        return 'status-delivered';
      case 'Cancelled':
        return 'status-cancelled';
      default:
        return '';
    }
  }

  toggleOrderDetails(order: Order): void {
    this.expandedOrder = this.expandedOrder === order ? null : order;
  }
}
