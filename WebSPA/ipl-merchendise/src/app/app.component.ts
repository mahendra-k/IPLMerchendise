import { Component } from '@angular/core';
import { Router, RouterOutlet,RouterLink } from '@angular/router';
import { NgIf,NgFor } from '@angular/common';
import { Subject } from 'rxjs/internal/Subject';
import { debounceTime } from 'rxjs';
import { ProductService } from './services/product.service';
import { Product } from './models/product.model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NgIf,RouterLink,NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ipl-merchendise';

  cartCount: number = 0;
  searchTerm = '';
  searchSubject = new Subject<string>();
  searchResults:Product[]= [];

  constructor(private router: Router,
    private productService: ProductService
  ) {

    this.searchSubject.pipe(debounceTime(300)).subscribe((searchText) => {
      if (searchText.length >= 3) {
        this.searchProducts(searchText);
      } else {
        this.searchResults = []; // Clear dropdown if less than 3 characters
      }
    });
  }

  onSearch(event: Event) {
    const searchText = (event.target as HTMLInputElement).value;
    this.searchSubject.next(searchText);
  }

  searchProducts(searchText: string) {
    this.productService.getProducts(searchText).subscribe((data) => {
      this.searchResults = data.items;
    });
  }

   // Navigate to product detail page
   goToProduct(productId: number) {
    this.searchResults = []; // Clear dropdown
    this.searchTerm = ''; // Clear search box
    this.router.navigate(['/product-detail', productId]);
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }

  goToOrders() {
    this.router.navigate(['/orders']);
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }
}
