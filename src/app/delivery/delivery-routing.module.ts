import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeliveryHomeComponent } from './page-home/delivery-home/delivery-home.component';
import { RestaurantHomeComponent  } from './page-restaurant/restaurant-home.component';


const routes: Routes = [
  { path: '', component: DeliveryHomeComponent },
  { path: 'delivery/customer', loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule)},
  { path: 'delivery/restaurant-home/:task/:searchName', component: RestaurantHomeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveryRoutingModule { }
