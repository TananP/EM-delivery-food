import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './layouts/footer/footer/footer.component';
import { HeaderComponent } from './layouts/header/header/header.component';
import { SearchComponent } from './layouts/header/components/search/search.component';
import { LocationComponent } from './layouts/header/components/location/location.component';
import { CategoryComponent } from './components/home-page/home/components/category/category.component';
import { RestaurantsComponent } from './components/home-page/home/components/restaurants/restaurants.component';
import { ShopListComponent } from './components/shop-list/shop-list.component';
import { RestaurantHomeComponent } from './components/restaurant-home/restaurant-home.component';
import { CartHomeComponent } from './components/cart-home/cart-home.component';
import { TaskSelectComponent } from './components/task-select/task-select.component';
import { DeliveryComponent } from './components/restaurant-home/components/delivery/delivery.component';
import { ReserveComponent } from './components/restaurant-home/components/reserve/reserve.component';
import { SearchResultPageComponent } from './components/search-result-page/search-result-page.component';
import { DeliveryHomeComponent } from './components/home-page/delivery-home/delivery-home.component';
import { ReserveHomeComponent } from './components/home-page/reserve-home/reserve-home.component';
import { HistoryComponent } from './layouts/header/components/history/history.component';
import { OrderComponent } from './layouts/header/components/order/order.component';
import { OrderInformationComponent } from './layouts/header/components/order/components/order-information.component';
import { ErrorNotFoundPageComponent } from './components/error-not-found-page/error-not-found-page.component';
import { CheckLoginComponent } from './components/check-login/check-login.component';
import { DeliveryAddressComponent } from './components/cart-home/components/delivery-address/delivery-address.component';

import { GoogleMapsModule } from '@angular/google-maps';
import { OrderListComponent } from './components/cart-home/components/order-list/order-list.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SearchComponent,
    LocationComponent,
    CategoryComponent,
    RestaurantsComponent,
    ShopListComponent,
    RestaurantHomeComponent,
    CartHomeComponent,
    TaskSelectComponent,
    DeliveryComponent,
    ReserveComponent,
    SearchResultPageComponent,
    DeliveryHomeComponent,
    ReserveHomeComponent,
    HistoryComponent,
    OrderComponent,
    OrderInformationComponent,
    ErrorNotFoundPageComponent,
    CheckLoginComponent,
    DeliveryAddressComponent,
    OrderListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GoogleMapsModule
  ],
  providers: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
