import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MerchantService } from 'src/app/services/merchant.service';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.scss']
})
export class ShopListComponent implements OnInit {
  public taskChoosed  = this.route.snapshot.paramMap.get('task');
  public categoryChoosed = this.route.snapshot.paramMap.get('category');
  private token = localStorage.getItem('token');
  public shopList: any;

  public loading = true;
  public loadingError = false;

  constructor(private route: ActivatedRoute , private merchantService: MerchantService ,
              private authorizationService: AuthorizationService) {
    this.authorizationService.checkAuthorization();
  }

  ngOnInit(): void {
    this.shopList = [];
    this.merchantService.searchByCategoryID(this.categoryChoosed).subscribe( x => {
      this.shopList = x;
      this.loading = false;
    }, error => {
      this.loadingError = true;
    });
  }

}
