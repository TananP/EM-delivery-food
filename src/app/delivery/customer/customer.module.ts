import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../components/shared.module';
import { GoogleMapsModule } from '@angular/google-maps';


import { CustomerRoutingModule } from './customer-routing.module';

import { CartHomeComponent } from './page-cart/cart-home.component';
import { DeliveryAddressComponent } from './page-cart/components/delivery-address/delivery-address.component';
import { OrderListComponent } from './page-cart/components/order-list/order-list.component';
import { PickUpAddressComponent } from './page-cart/components/pick-up-address/pick-up-address.component';

import { ProfileComponent } from './page-profile/profile.component';
import { OrderComponent } from './page-order/order.component';
import { OrderInformationComponent } from './page-order/components/order-information.component';
import { HistoryComponent } from './page-history/history.component';
import { HistoryInformationComponent } from './page-history/components/history-information/history-information.component';


@NgModule({
  declarations: [
    CartHomeComponent,
    DeliveryAddressComponent,
    OrderListComponent,
    PickUpAddressComponent,
    ProfileComponent,
    OrderComponent,
    OrderInformationComponent,
    HistoryComponent,
    HistoryInformationComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    GoogleMapsModule,
    SharedModule
  ]
})
export class CustomerModule { }
