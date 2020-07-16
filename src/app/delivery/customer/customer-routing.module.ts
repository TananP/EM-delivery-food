import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CartHomeComponent } from './page-cart/cart-home.component';
import { ProfileComponent } from './page-profile/profile.component';
import { DeliveryHomeComponent } from '../page-home/delivery-home/delivery-home.component';
import { OrderComponent } from './page-order/order.component';
import { HistoryComponent } from './page-history/history.component';

const routes: Routes = [
  { path: '', component: DeliveryHomeComponent },
  { path: 'cart-page', component: CartHomeComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'order', component: OrderComponent },
  { path: 'profile', component: ProfileComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
