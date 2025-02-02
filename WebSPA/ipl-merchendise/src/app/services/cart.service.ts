import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private storageKey = 'cart'; // Key to store the cart in local storage

  constructor() {}

  // Retrieve the current cart from localStorage
  getCart(): { productId: number; quantity: number }[] {
    const cart = localStorage.getItem(this.storageKey);
    return cart ? JSON.parse(cart) : [];
  }

  // Add item to the cart (productId and quantity)
  addToCart(productId: number, quantity: number): void {
    let cart = this.getCart();
    
    // Check if the product is already in the cart
    const existingItemIndex = cart.findIndex(item => item.productId === productId);

    if (existingItemIndex > -1) {
      // If it exists, update the quantity
      cart[existingItemIndex].quantity += quantity;
    } else {
      // If not, add new item to the cart
      cart.push({ productId, quantity });
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

  // Clear the entire cart
  clearCart(): void {
    localStorage.removeItem(this.storageKey);
  }

  itemExists(productId:number){
    return this.getCart().some(_=>_.productId == productId);
  }
}
