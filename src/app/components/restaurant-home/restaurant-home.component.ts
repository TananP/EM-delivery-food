import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MerchantService } from 'src/app/services/merchant.service';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-restaurant-home',
  templateUrl: './restaurant-home.component.html',
  styleUrls: ['./restaurant-home.component.scss']
})
export class RestaurantHomeComponent implements OnInit {
  // public locationId = this.route.snapshot.paramMap.get('locationId');
  // public floorId = this.route.snapshot.paramMap.get('floorId');
  // public departmentId = this.route.snapshot.paramMap.get('departmentId');
  // public searchInput = this.route.snapshot.paramMap.get('searchInput');
  // public routeId = this.route.snapshot.paramMap.get('routeID');
  public searchName = this.route.snapshot.paramMap.get('searchName');
  public taskSelect = this.route.snapshot.paramMap.get('task');
  public finnishLoad = false;

  public restaurantInfo: any;
  public merchantID: number;
  public shopOpen: boolean;

  constructor(private route: ActivatedRoute , private merchantService: MerchantService ,
              private authorizationAPI: AuthorizationService , private router: Router){
                this.authorizationAPI.checkAuthorization();
              }

  ngOnInit(): void {
    this.merchantID = 0.1;
    this.restaurantInfo = [];
    this.merchantService.getMerchantInfo(this.searchName).subscribe( x => {
      this.restaurantInfo = x;
      // console.log(this.restaurantInfo.data[0].openTime);
      // console.log(x);
      if (this.restaurantInfo.data.length > 1) {
        this.router.navigate(['/' + this.taskSelect , 'search', this.taskSelect , this.searchName]);
      } else {
        // const currentTime = Date().toString().split(' ')[4];
        const currentTime = Date().split(' ')[4];
        if (this.restaurantInfo.data[0].openTime <= currentTime && currentTime <= this.restaurantInfo.data[0].closeTime) {
          // console.log('Shop open !!!!');
          this.shopOpen = true;
        } else {
          // console.log('Shop close !!!!');
          this.shopOpen = false;
        }
        this.merchantID = this.restaurantInfo.data[0].merchantId;
        this.finnishLoad = true;
      }
      // console.log(this.merchantID);
    });
  }
}
