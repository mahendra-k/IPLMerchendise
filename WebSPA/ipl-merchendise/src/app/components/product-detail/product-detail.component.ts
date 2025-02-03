import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { FormsModule } from '@angular/forms';
import { DecimalPipe,NgIf } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute,RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
@Component({
  selector: 'app-product-detail',
  imports: [FormsModule, DecimalPipe,RouterLink,NgIf],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  product: Product = new Product({});
  productId: number = 0;
  quantity: number = 0;

  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = +params['id']; // Get new product ID
      this.getProduct();
    });

    this.productId = Number(this.route.snapshot.paramMap.get('id')); // Get ID from URL
    this.getProduct();
  }

  getProduct(){
    this.productService.getProductById(this.productId).subscribe(data=>{
      this.product = data;
    });
  }

  addToCart() {
    this.cartService.addToCart(this.product, 1);
  }

  itemExistsInCart(productId:number){
    return this.cartService.itemExists(productId);
  }
}
