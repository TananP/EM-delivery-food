import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskSelectComponent } from './components/task-select/task-select.component';
import { DeliveryHomeComponent } from './components/home-page/delivery-home/delivery-home.component';
import { ReserveHomeComponent } from './components/home-page/reserve-home/reserve-home.component';
import { ShopListComponent } from './components/shop-list/shop-list.component';
import { RestaurantHomeComponent  } from './components/restaurant-home/restaurant-home.component';
import { SearchResultPageComponent } from './components/search-result-page/search-result-page.component';
import { ErrorNotFoundPageComponent } from './components/error-not-found-page/error-not-found-page.component';
import { CheckLoginComponent } from './components/check-login/check-login.component';
import { from } from 'rxjs';

const routes: Routes = [
  {
    path: '',
    component: TaskSelectComponent,
  },
  {
    path: 'home/:loginID',
    component: CheckLoginComponent,
  },
  {
    path: '404',
    component: ErrorNotFoundPageComponent,
  },
  {
    path: 'delivery',
    component: DeliveryHomeComponent
  },
  {
    path: 'reserve',
    component: ReserveHomeComponent
  },
  {
    path: 'delivery/search/:task/:searchInput',
    component: SearchResultPageComponent,
  },
  {
    path: 'reserve/search/:task/:searchInput',
    component: SearchResultPageComponent,
  },
  {
    path: 'delivery/shop-list/:task/:category',
    component: ShopListComponent
  },
  {
    path: 'reserve/shop-list/:task/:category',
    component: ShopListComponent
  },
  {
    path: 'delivery/restaurant-home/:task/:routeID/:restaurantID',
    component: RestaurantHomeComponent
  },
  {
    path: 'reserve/restaurant-home/:task/:routeID/:restaurantID',
    component: RestaurantHomeComponent
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  // imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
