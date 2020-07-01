import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { TaskSelectComponent } from './components/page-task-select/task-select.component';
import { DeliveryHomeComponent } from './components/page-home/delivery-home/delivery-home.component';
// import { ReserveHomeComponent } from './components/home-page/reserve-home/reserve-home.component';
// import { ShopListComponent } from './components/shop-list/shop-list.component';
import { RestaurantHomeComponent  } from './components/page-restaurant/restaurant-home.component';
import { SearchResultPageComponent } from './components/page-search-result/search-result-page.component';
// import { ErrorNotFoundPageComponent } from './components/page-error-not-found/error-not-found-page.component';
import { PaymentResultHomeComponent } from './components/page-payment-result/payment-result-home.component';
import { CheckLoginComponent } from './components/page-check-login/check-login.component';
import {CartHomeComponent} from './components/page-cart/cart-home.component';
import {ProfileComponent} from './layouts/header/components/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: DeliveryHomeComponent,
  },
  {
    path: 'home/:loginID',
    component: CheckLoginComponent,
  },
  // {
  //   path: '404',
  //   component: ErrorNotFoundPageComponent,
  // },
  {
    path: 'delivery',
    component: DeliveryHomeComponent
  },
  // {
  //   path: 'reserve',
  //   component: ReserveHomeComponent
  // },
  {
    path: 'delivery/search/:task/:searchInput',
    component: SearchResultPageComponent,
  },
  // {
  //   path: 'reserve/search/:task/:searchInput',
  //   component: SearchResultPageComponent,
  // },
  // {
  //   path: 'delivery/shop-list/:task/:category',
  //   component: ShopListComponent
  // },
  // {
  //   path: 'reserve/shop-list/:task/:category',
  //   component: ShopListComponent
  // },
  {
    path: 'delivery/restaurant-home/:task/:searchName',
    component: RestaurantHomeComponent
  },
  {
    path: 'delivery/profile',
    component: ProfileComponent
  },
  {
    path: 'delivery/cart-page',
    component: CartHomeComponent
  },
  {
    path: 'delivery/payment-result',
    component: PaymentResultHomeComponent
  },
  // {
  //   path: 'reserve/restaurant-home/:task/:routeID/:searchName/:merchantId/:locationId/:floorId/:departmentId',
  //   component: RestaurantHomeComponent
  // },
  // {
  //   path: 'delivery/restaurant-home/:task/:routeID/:searchInput/:searchName/:merchantId/:locationId/:floorId/:departmentId',
  //   component: RestaurantHomeComponent
  // },
  // {
  //   path: 'reserve/restaurant-home/:task/:routeID/:searchInput/:searchName/:merchantId/:locationId/:floorId/:departmentId',
  //   component: RestaurantHomeComponent
  // },
  // { path: '', redirectTo: 'delivery' }
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  // imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
