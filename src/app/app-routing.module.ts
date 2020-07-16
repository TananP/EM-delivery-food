import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchingComponent } from './components/page-searching/searching.component';
import { SearchResultPageComponent } from './components/page-search-result/search-result-page.component';
import { PaymentResultHomeComponent } from './components/page-payment-result/payment-result-home.component';
import { CheckLoginComponent } from './components/page-check-login/check-login.component';
// import { ProfileComponent } from './layouts/header/components/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./delivery/delivery.module').then(m => m.DeliveryModule)
  },
  {
    path: 'home/:loginID',
    component: CheckLoginComponent,
  },
  {
    path: 'delivery',
    loadChildren: () => import('./delivery/delivery.module').then(m => m.DeliveryModule)
  },
  {
    path: 'delivery/searching/:task/:searchInput',
    component: SearchingComponent,
  },
  {
    path: 'delivery/search/:task/:searchInput',
    component: SearchResultPageComponent,
  },
  // {
  //   path: 'delivery/profile',
  //   component: ProfileComponent
  // },
  {
    path: 'result',
    component: PaymentResultHomeComponent
  },
  { path: 'customers', loadChildren: () => import('./delivery/customer/customer.module').then(m => m.CustomerModule) },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  // imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
