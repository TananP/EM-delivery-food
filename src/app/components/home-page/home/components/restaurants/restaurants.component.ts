import { Component, OnInit, Input } from '@angular/core';
import { MerchantService } from 'src/app/services/merchant.service';

@Component({
  selector: 'app-home-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent implements OnInit {
  @Input() taskData: string;
  @Input() categorySelectedID: number;
  public restaurantsList: any;
  public loading = true;
  public loadingError = false;

  constructor(private restaurantsAPI: MerchantService) { }

  ngOnInit(): void {
    console.log('categorySelectedID == ' + this.categorySelectedID);
    this.restaurantsList = [];
    this.restaurantsAPI.getMerchantList().subscribe(x => {
      this.restaurantsList = x;
      this.loading = false;
    }, error => {
      this.loading = false;
      this.loadingError = true;
    });
  }

  getSelectedCategory() {
    // this.restaurantsAPI.searchByCategoryID().subscribe( x => {

    // });
  }

}
