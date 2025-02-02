import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-product-detail',
  imports: [FormsModule, DecimalPipe],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  product: Product = new Product({});
  productId: number = 0;

  constructor(private productService: ProductService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id')); // Get ID from URL
    this.getProduct();
  }

  getProduct(){
    this.productService.getProductById(this.productId).subscribe(data=>{
      this.product = data;
    });
  }

  addToCart() {
    if (this.product.quantity > 0) {
      console.log(`${this.product.name} added to cart with quantity: ${this.product.quantity}`);
    } else {
      alert('Please select a quantity');
    }
  }
}
