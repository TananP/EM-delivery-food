import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './layouts/footer/footer/footer.component';
import { HeaderComponent } from './layouts/header/header/header.component';
import { SearchComponent } from './layouts/header/components/search/search.component';
import { LocationComponent } from './layouts/header/components/location/location.component';
import { CategoryComponent } from './components/page-home/home/components/category/category.component';
import { RestaurantsComponent } from './components/page-home/home/components/restaurants/restaurants.component';
import { SearchingComponent } from './components/page-searching/searching.component';
import { RestaurantHomeComponent } from './components/page-restaurant/restaurant-home.component';
import { CartHomeComponent } from './components/page-cart/cart-home.component';
import { TaskSelectComponent } from './components/page-task-select/task-select.component';
import { DeliveryComponent } from './components/page-restaurant/components/delivery/delivery.component';
import { ReserveComponent } from './components/page-restaurant/components/reserve/reserve.component';
import { SearchResultPageComponent } from './components/page-search-result/search-result-page.component';
import { DeliveryHomeComponent } from './components/page-home/delivery-home/delivery-home.component';
import { ReserveHomeComponent } from './components/page-home/reserve-home/reserve-home.component';
import { HistoryComponent } from './layouts/header/components/history/history.component';
import { OrderComponent } from './layouts/header/components/order/order.component';
import { OrderInformationComponent } from './layouts/header/components/order/components/order-information.component';
import { ErrorNotFoundPageComponent } from './components/page-error-not-found/error-not-found-page.component';
import { CheckLoginComponent } from './components/page-check-login/check-login.component';
import { DeliveryAddressComponent } from './components/page-cart/components/delivery-address/delivery-address.component';

import { GoogleMapsModule } from '@angular/google-maps';
import { OrderListComponent } from './components/page-cart/components/order-list/order-list.component';
import { PickUpAddressComponent } from './components/page-cart/components/pick-up-address/pick-up-address.component';
import { LoadingPopUpComponent } from './components/pop-up/loading-pop-up/loading-pop-up.component';
import { ProfileComponent } from './layouts/header/components/profile/profile.component';
import { PaymentResultHomeComponent } from './components/page-payment-result/payment-result-home.component';
import { HistoryInformationComponent } from './layouts/header/components/history/components/history-information/history-information.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SearchComponent,
    LocationComponent,
    CategoryComponent,
    RestaurantsComponent,
    SearchingComponent,
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
    PickUpAddressComponent,
    LoadingPopUpComponent,
    ProfileComponent,
    PaymentResultHomeComponent,
    HistoryInformationComponent,
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
