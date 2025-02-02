import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ipl-merchendise';

  cartCount: number = 0;
  
  constructor(private router: Router) {}

  onSearch(event: Event) {
    const searchText = (event.target as HTMLInputElement).value;
    console.log('Searching for:', searchText);
    // Implement search logic here
  }

  search() {
    console.log('Search button clicked');
    // Implement actual search functionality
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
