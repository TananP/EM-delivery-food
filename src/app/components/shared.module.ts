import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingPopUpComponent } from './pop-up/loading-pop-up/loading-pop-up.component';

@NgModule({
  declarations: [
    LoadingPopUpComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoadingPopUpComponent
  ]
})
export class SharedModule { }
