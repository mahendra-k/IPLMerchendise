import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { NgFor, DecimalPipe,NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-list',
  imports: [NgFor, DecimalPipe, FormsModule, RouterLink,NgIf],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService, private cartService: CartService) {

  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe(data => {
      this.products = data.items;
    });
  }

  addToCart(product:Product){
    this.cartService.addToCart(product, 1);
  }

  itemExistsInCart(productId:number){
    return this.cartService.itemExists(productId);
  }
}
