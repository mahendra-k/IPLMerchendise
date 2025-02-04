import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { NgIf, NgFor, CurrencyPipe } from '@angular/common';
import { CartItem } from '../../models/cart-item.model';
import { OrderService } from '../../services/order.service';
import { OrderItem } from '../../models/order.model';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [NgIf, NgFor, FormsModule, CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  userId: number = 0;
  constructor(private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadCart();
    this.userId = +(localStorage.getItem('userId') ?? 0);
  }

  loadCart() {
    this.cartItems = this.cartService.getCart();
  }

  removeFromCart(productId: number) {
    this.cartService.removeFromCart(productId);
    this.loadCart();
  }

  isUserProfileCreated(): boolean {
    return !!this.userId;
  }

  promptProfileCreation(): void {
    this.router.navigate(['/user-profile']);
  }

  placeOrder() {
    var orderItems: OrderItem[] = [];
    this.cartItems.forEach(_ => {
      orderItems.push(new OrderItem({
        productId: _.productId,
        price: _.price,
        quantity: _.quantity,
        productName: _.productName,
        currencyCode: _.currencyCode
      }));
    });
    this.orderService.placeOrder(orderItems, this.userId).subscribe(_ => {
      alert('Order placed successfully! 🎉');
      this.cartService.clearCart();
      this.loadCart();
    });
  }

  updateQuantity(item: CartItem) {
    this.cartService.updateCart(item.productId, item.quantity);
    this.loadCart();
  }

  getOrderTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  getCurrencyCode(): string {
    return this.cartItems[0].currencyCode;
  }
}
