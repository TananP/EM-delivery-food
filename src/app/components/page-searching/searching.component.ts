import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MerchantService } from 'src/app/services/merchant.service';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-searching',
  templateUrl: './searching.component.html',
  styleUrls: ['./searching.component.scss']
})
export class SearchingComponent implements OnInit {
  public shopList: any;
  public searchInput = this.route.snapshot.paramMap.get('searchInput');
  public taskSelect = this.route.snapshot.paramMap.get('task');

  constructor(private route: ActivatedRoute, private router: Router , private merchantService: MerchantService ,
              private authorizationService: AuthorizationService) {
    this.authorizationService.checkAuthorization();
  }

  ngOnInit(): void {
    this.shopList = [];
    this.merchantService.getMerchantInfo(this.searchInput).subscribe( x => {
      this.shopList = x;
      if (this.shopList.data.length > 1 || this.shopList.data[0] === undefined) {
        this.router.navigate(['/' + this.taskSelect , 'search', this.taskSelect , this.searchInput]);
      } else {
        this.router.navigate(['/delivery/restaurant-home/', 'delivery' , this.searchInput]);
      }
    }, error => {
      this.router.navigate(['']);
    });
  }

}
