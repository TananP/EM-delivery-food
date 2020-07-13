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
    // const queryParams = this.route.snapshot.queryParams;
    // const routeParams = this.route.snapshot.params;
    // console.log(queryParams);
    this.getInfo();
  }

  getInfo(){
    this.merchantID = 0.1;
    this.restaurantInfo = [];
    this.merchantService.getMerchantInfo(this.searchName).subscribe( x => {
      this.restaurantInfo = x;
      if (this.restaurantInfo.data.length > 1 || this.restaurantInfo.data[0] === undefined) {
        this.router.navigate(['/' + this.taskSelect , 'search', this.taskSelect , this.searchName]);
      } else {
        const currentTime = Date().split(' ')[4];
        if (this.restaurantInfo.data[0].openTime <= currentTime && currentTime <= this.restaurantInfo.data[0].closeTime) {
          this.shopOpen = true;
        } else {
          this.shopOpen = false;
        }
        this.merchantID = this.restaurantInfo.data[0].merchantId;
        this.finnishLoad = true;
      }
    }, error => {
      console.log(error);
    });
  }
}
