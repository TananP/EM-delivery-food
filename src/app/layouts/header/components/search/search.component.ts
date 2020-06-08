import { Component, OnInit, Input } from '@angular/core';
import { MerchantService } from 'src/app/services/merchant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input() taskData: string;
  public searchInput = '';
  public searchList: any;
  public autoCorrect = false;
  public openLoadingPopUp = false;

  constructor(private merchantService: MerchantService , private router: Router) {}

  ngOnInit(): void {
    this.searchList = [];
  }

  onSubmit(search) {
    if (search === '') {
      this.autoCorrect = false;
    }else {
      this.searchInput = search;
      this.autoCorrect = true;
      this.merchantService.searchByRestaurantName(this.searchInput).subscribe( x => {
        this.searchList = x;
      }, error => {
        this.searchList = [];
        // this.loadingError = true;
      });
    }
  }
  clickAutoCorrect(item){
    this.searchInput = item;
    this.autoCorrect = false;
  }
  hideAutoCorrect(){
    // this.searchInput = '';
    this.autoCorrect = false;
  }
  openToNewLink(){
    this.openLoadingPopUp = true;
    // console.log('8888');
    this.router.navigate(['/' + this.taskData , 'restaurant-home', this.taskData[0] , this.searchInput]);
  }
}
