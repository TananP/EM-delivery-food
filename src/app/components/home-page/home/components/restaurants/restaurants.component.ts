import { Component, OnInit, Input } from '@angular/core';
import { MerchantService } from 'src/app/services/merchant.service';

@Component({
  selector: 'app-home-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent implements OnInit {
  @Input() taskData: string;

  public restaurantsList: any;

  constructor(private restaurantsAPI: MerchantService) { }

  ngOnInit(): void {

    this.restaurantsAPI.getMerchantList().subscribe(x => {
      this.restaurantsList = x.data[0].childMstMerchantTranslation;
    });
  }

}
