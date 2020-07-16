import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './components/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header/header.component';
import { SearchComponent } from './layouts/header/components/search/search.component';
import { SearchingComponent } from './components/page-searching/searching.component';
import { TaskSelectComponent } from './components/page-task-select/task-select.component';
import { SearchResultPageComponent } from './components/page-search-result/search-result-page.component';

// import { HistoryComponent } from './layouts/header/components/history/history.component';
// import { HistoryInformationComponent } from './layouts/header/components/history/components/history-information/history-information.component';
// import { OrderComponent } from './layouts/header/components/order/order.component';
// import { OrderInformationComponent } from './layouts/header/components/order/components/order-information.component';
import { ErrorNotFoundPageComponent } from './components/page-error-not-found/error-not-found-page.component';
import { CheckLoginComponent } from './components/page-check-login/check-login.component';

// import { ProfileComponent } from './layouts/header/components/profile/profile.component';
import { PaymentResultHomeComponent } from './components/page-payment-result/payment-result-home.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchComponent,
    SearchingComponent,
    TaskSelectComponent,
    SearchResultPageComponent,
    // HistoryComponent,
    // HistoryInformationComponent,
    // OrderComponent,
    // OrderInformationComponent,
    ErrorNotFoundPageComponent,
    CheckLoginComponent,
    // ProfileComponent,
    PaymentResultHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
