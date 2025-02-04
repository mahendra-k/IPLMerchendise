import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { CartItem } from '../models/cart-item.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private storageKey = 'cart';
  private cartItemCount = new BehaviorSubject<number>(0);

  cartItemCount$ = this.cartItemCount.asObservable();

  constructor() {
    this.updateCartCount();
  }

  private updateCartCount() {
    this.cartItemCount.next(this.getCart().reduce((sum, item) => +sum + +item.quantity, 0));
  }

  getCart(): CartItem[] {
    const cart = localStorage.getItem(this.storageKey);
    return cart ? JSON.parse(cart) : [];
  }


  addToCart(product: Product, quantity: number): void {
    let cart = this.getCart();

    const existingItemIndex = cart.findIndex(item => item.productId === product.id);

    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += quantity;
    } else {
      cart.push({ productId: product.id, quantity, productName: product.name, imageUrl: "", price: product.price, currencyCode: product.currencyCode });
    }

    localStorage.setItem(this.storageKey, JSON.stringify(cart));
    this.updateCartCount();
  }

  removeFromCart(productId: number): void {
    let cart = this.getCart();
    cart = cart.filter(item => item.productId !== productId);

    localStorage.setItem(this.storageKey, JSON.stringify(cart));
    this.updateCartCount();
  }

  updateCart(productId: number, quantity: number) {
    let cart = this.getCart();
    const item = cart.find(item => item.productId === productId);
    if (item) item.quantity = quantity;
    localStorage.setItem(this.storageKey, JSON.stringify(cart));
    this.updateCartCount();
  }

  clearCart(): void {
    this.updateCartCount();
    localStorage.removeItem(this.storageKey);
    this.updateCartCount();
  }

  itemExists(productId: number) {
    return this.getCart().some(_ => _.productId == productId);
  }
}
