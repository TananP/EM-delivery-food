import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MerchantService } from 'src/app/services/merchant.service';

@Component({
  selector: 'app-restaurant-home',
  templateUrl: './restaurant-home.component.html',
  styleUrls: ['./restaurant-home.component.scss']
})
export class RestaurantHomeComponent implements OnInit {
  public locationId = this.route.snapshot.paramMap.get('locationId');
  public floorId = this.route.snapshot.paramMap.get('floorId');
  public departmentId = this.route.snapshot.paramMap.get('departmentId');

  public searchName = this.route.snapshot.paramMap.get('searchName');
  public routeId = this.route.snapshot.paramMap.get('routeID');
  public taskSelect = this.route.snapshot.paramMap.get('task');
  public restaurantInfo: any;

  constructor(private route: ActivatedRoute , private merchantService: MerchantService) {
   }

  ngOnInit(): void {
    this.restaurantInfo = [];
    this.merchantService.getMerchantInfo(this.searchName , this.locationId , this.floorId , this.departmentId ).subscribe( x => {
      this.restaurantInfo = x;
    });
  }
}
