import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MerchantService } from 'src/app/services/merchant.service';

@Component({
  selector: 'app-search-result-page',
  templateUrl: './search-result-page.component.html',
  styleUrls: ['./search-result-page.component.scss']
})
export class SearchResultPageComponent implements OnInit {
  public taskChoosed = this.route.snapshot.paramMap.get('task');
  public searchName = this.route.snapshot.paramMap.get('searchInput');
  public shopList: any;
  private token = localStorage.getItem('token');
  constructor(private route: ActivatedRoute , private merchantService: MerchantService) { }

  ngOnInit(): void {
    this.merchantService.searchByRestaurantName( this.searchName , 'TestApiKey', this.token).subscribe( x => {
      this.shopList = x.data;
    });
  }

}
