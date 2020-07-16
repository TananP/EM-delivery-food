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
  public currentTime = Date().split(' ')[4];

  constructor(private authorizationAPI: AuthorizationService , private merchantService: MerchantService) {
    this.authorizationAPI.checkAuthorization();
  }

  ngOnInit(): void {
    this.restaurantsList = [];
    this.merchantService.getMerchantList().subscribe(x => {
      this.restaurantsList = x;
      // console.log(this.restaurantsList.data);
      this.filterRestaurants(this.restaurantsList.data);
      this.loading = false;
    }, error => {
      this.loading = false;
      this.loadingError = true;
    });
  }
  filterRestaurants(restaurantsList){
    if (restaurantsList !== []) {
      const filterListy = [];
      for (const index of restaurantsList) {
        if (index.active) {
          filterListy.push(index);
        }
      }
      this.restaurantsList = filterListy;
    }
  }
  selectedCategory(event){
    this.categorySelectedID = event;
    this.reRenderRestaurants();
  }
  reRenderRestaurants(){
    this.loading = true;
    this.restaurantsList = [];
    this.merchantService.searchByCategoryID(this.categorySelectedID).subscribe( x => {
      this.restaurantsList = x;
      this.filterRestaurants(this.restaurantsList.data);
      this.loading = false;
      // this.loadingError = false;
    }, error => {
      console.log(error);
      this.loadingError = true;
    });
  }
}
