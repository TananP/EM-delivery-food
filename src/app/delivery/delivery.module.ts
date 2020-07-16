import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../components/shared.module';

import { DeliveryRoutingModule } from './delivery-routing.module';
import { DeliveryHomeComponent } from './page-home/delivery-home/delivery-home.component';

import { CategoryComponent } from './page-home/home/components/category/category.component';
import { RestaurantHomeComponent } from './page-restaurant/restaurant-home.component';
import { ​DeliveryComponent } from './page-restaurant/components/delivery/delivery.component';

// import { CartHomeComponent } from './customer/page-cart/cart-home.component';
// import { DeliveryAddressComponent } from './customer/page-cart/components/delivery-address/delivery-address.component';
// import { OrderListComponent } from './customer/page-cart/components/order-list/order-list.component';
// import { PickUpAddressComponent } from './customer/page-cart/components/pick-up-address/pick-up-address.component';

@NgModule({
  declarations: [
    // Home page
    DeliveryHomeComponent,
    CategoryComponent,
    // Resterant page
    RestaurantHomeComponent,
    DeliveryComponent,
    // // Cart page
    // CartHomeComponent,
    // DeliveryAddressComponent,
    // OrderListComponent,
    // PickUpAddressComponent
  ],
  imports: [
    CommonModule,
    DeliveryRoutingModule,
    SharedModule
  ]
})
export class DeliveryModule { }
