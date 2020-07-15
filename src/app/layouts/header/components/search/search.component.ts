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
  // public searchListRender: any;
  public autoCorrect = false;
  public openLoadingPopUp = false;
  public searchInputEmpty = true;

  constructor(private merchantService: MerchantService , private router: Router) {}

  ngOnInit(): void {
  }

  onSubmit(search) {
    if (search === '') {
      this.autoCorrect = false;
      this.searchInputEmpty = true;
    }else {
      this.searchList = [];
      // this.searchListRender = [];
      this.searchInput = search;
      this.searchInputEmpty = false;
      this.autoCorrect = true;
      this.merchantService.searchByRestaurantName(this.searchInput).subscribe( x => {
        this.searchList = x;
        // if (this.searchList.data.length > 5) {
        //   for (let i = 0; i < 5 ; i ++) {
        //     this.searchListRender.push(this.searchList.data[i]);
        //   }
        // } else {
        //   this.searchList.data.forEach(element => {
        //     this.searchListRender.push(element);
        //   });
        // }
      }, error => {
        this.searchList = [];
        // this.searchListRender = [];
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
    this.autoCorrect = false;
    // this.openLoadingPopUp = true;
    // console.log(['/' + this.taskData , 'restaurant-home', this.taskData[0] , this.searchInput]);
    // this.router.navigate(['/delivery/restaurant-home/delivery' , this.searchInput]);
    this.router.navigate(['/delivery/searching/delivery' , this.searchInput]);
    return false;
  }
}
