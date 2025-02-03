import { Component, OnInit } from '@angular/core';
import { CurrencyPipe,DatePipe,NgFor,NgIf } from '@angular/common';
import { Order } from '../../models/order.model';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-history',
  imports: [CurrencyPipe, DatePipe, NgFor,NgIf],
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {
  orders: Order[] = [
  ];

  expandedOrder: Order | null = null; // Store expanded order object
  constructor(private orderService:OrderService) { }

  ngOnInit(): void { 
    this.getOrders();
  }

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

  getOrders(){
    this.orderService.getOrders(1).subscribe(data=>{
      this.orders = data;
    })
  }
}
