import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private storageKey = 'cart'; // Key to store the cart in local storage

  constructor() {}

  // Retrieve the current cart from localStorage
  getCart(): CartItem[] {
    const cart = localStorage.getItem(this.storageKey);
    return cart ? JSON.parse(cart) : [];
  }

  // Add item to the cart (productId and quantity)
  addToCart(product: Product, quantity: number): void {
    let cart = this.getCart();
    
    // Check if the product is already in the cart
    const existingItemIndex = cart.findIndex(item => item.productId === product.id);

    if (existingItemIndex > -1) {
      // If it exists, update the quantity
      cart[existingItemIndex].quantity += quantity;
    } else {
      // If not, add new item to the cart
      cart.push({ productId: product.id, quantity, productName: product.name, imageUrl:"",price:product.price });
    }

    // Save updated cart to localStorage
    localStorage.setItem(this.storageKey, JSON.stringify(cart));
  }

  // Remove an item from the cart
  removeFromCart(productId: number): void {
    let cart = this.getCart();
    cart = cart.filter(item => item.productId !== productId);

    // Save updated cart to localStorage
    localStorage.setItem(this.storageKey, JSON.stringify(cart));
  }

  updateCart(productId: number, quantity: number) {
    let cart = this.getCart();
    const item = cart.find(item => item.productId === productId);
    if (item) item.quantity = quantity;
    localStorage.setItem(this.storageKey, JSON.stringify(cart));
  }

  // Clear the entire cart
  clearCart(): void {
    localStorage.removeItem(this.storageKey);
  }

  itemExists(productId:number){
    return this.getCart().some(_=>_.productId == productId);
  }
}
