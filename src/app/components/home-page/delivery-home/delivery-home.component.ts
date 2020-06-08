import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { MerchantService } from 'src/app/services/merchant.service';

@Component({
  selector: 'app-delivery-home',
  templateUrl: './delivery-home.component.html',
  styleUrls: ['./delivery-home.component.scss']
})
export class DeliveryHomeComponent implements OnInit {
  public categorySelectedID = 0;
  public restaurantsList: any;
  public loading = true;
  public loadingError = false;

  constructor(private authorizationAPI: AuthorizationService , private merchantService: MerchantService) {}

  ngOnInit(): void {
    this.authorizationAPI.checkAuthorization();
    this.restaurantsList = [];
    this.merchantService.getMerchantList().subscribe(x => {
      this.restaurantsList = x;
      this.loading = false;
    }, error => {
      this.loading = false;
      this.loadingError = true;
    });
  }
  selectedCategory(event){
    this.categorySelectedID = event;
    this.reRenderRestaurants();
  }
  reRenderRestaurants(){
    this.loading = true;
    this.merchantService.searchByCategoryID(this.categorySelectedID).subscribe( x => {
      this.restaurantsList = x;
      this.loading = false;
    }, error => {
      this.loadingError = true;
    });
  }
}
