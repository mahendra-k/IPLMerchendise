import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { NgIf, NgFor } from '@angular/common';
import { CartItem } from '../../models/cart-item.model';

@Component({
  selector: 'app-cart',
  imports: [NgIf, NgFor],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.loadCart();
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

  // Proceed to place order
  placeOrder() {
    alert('Order placed successfully! 🎉');
    this.cartService.clearCart(); // Clear cart after placing order
    this.loadCart(); // Refresh cart display
  }
}
