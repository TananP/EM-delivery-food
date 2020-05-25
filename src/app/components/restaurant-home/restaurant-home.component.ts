import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MerchantService } from 'src/app/services/merchant.service';

@Component({
  selector: 'app-restaurant-home',
  templateUrl: './restaurant-home.component.html',
  styleUrls: ['./restaurant-home.component.scss']
})
export class RestaurantHomeComponent implements OnInit {
  public restaurantID = this.route.snapshot.paramMap.get('restaurantID');
  public searchName = this.route.snapshot.paramMap.get('searchName');
  public routeId = this.route.snapshot.paramMap.get('routeID');
  public taskSelect = this.route.snapshot.paramMap.get('task');
  public restaurantInfo: any;

  constructor(private route: ActivatedRoute , private merchantService: MerchantService) {
   }

  ngOnInit(): void {
    this.restaurantInfo = [];
    this.merchantService.getFoodList(this.restaurantID).subscribe(x => {
      this.restaurantInfo = x;
      console.log(x);
    });
  }
}
