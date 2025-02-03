import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';

export const routes: Routes = [
    { path: '', component: ProductListComponent }, // Default Route
    { path: 'cart', component: CartComponent },
    { path: 'orders', component: OrderHistoryComponent },
    { path: 'product-detail/:id', component: ProductDetailComponent },
  ];
