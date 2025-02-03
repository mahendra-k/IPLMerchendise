import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { NgIf, NgFor,CurrencyPipe } from '@angular/common';
import { CartItem } from '../../models/cart-item.model';
import { OrderService } from '../../services/order.service';
import { OrderItem } from '../../models/order.model';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [NgIf, NgFor,FormsModule,CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  userId:number = 0;
  constructor(private cartService: CartService,
    private orderService: OrderService,
    private router:Router
  ) { }

  ngOnInit() {
    this.loadCart();
    this.userId = +(localStorage.getItem('userId') ?? 0);
  }

  // Load cart items from localStorage
  loadCart() {
    this.cartItems = this.cartService.getCart();
  }

  // Remove item from cart
  removeFromCart(productId: number) {
    this.cartService.removeFromCart(productId);
    this.loadCart(); // Reload cart after removal
  }

  isUserProfileCreated(): boolean {
    return this.userId !== null || this.userId !== 0;
  }

  promptProfileCreation(): void {
    alert('Please create your profile before placing an order!');
    this.router.navigate(['/profile']); // Redirect user to the profile creation page
  }

  // Proceed to place order
  placeOrder() {
    var orderItems: OrderItem[] = [];
    this.cartItems.forEach(_ => {
      orderItems.push(new OrderItem({
        productId: _.productId,
        price: _.price,
        quantity: _.quantity
      }));
    });
    this.orderService.placeOrder(orderItems, 1).subscribe(_ => {
      alert('Order placed successfully! 🎉');
      this.cartService.clearCart(); // Clear cart after placing order
      this.loadCart(); // Refresh cart display
    });
  }

  updateQuantity(item: CartItem) {
    this.cartService.updateCart(item.productId, item.quantity);
    this.loadCart(); // Refresh cart
  }

  getOrderTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }
}
