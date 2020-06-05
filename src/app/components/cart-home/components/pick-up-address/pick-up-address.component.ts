import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {MerchantService} from 'src/app/services/merchant.service';

@Component({
  selector: 'app-pick-up-address',
  templateUrl: './pick-up-address.component.html',
  styleUrls: ['./pick-up-address.component.scss']
})
export class PickUpAddressComponent implements OnInit {
  @Output() selectedAddress = new EventEmitter();
  public pickUpLoList: any;
  public activeItem = null;

  constructor(private merchantService: MerchantService) { }

  ngOnInit(): void {
    this.merchantService.pickUp().subscribe(x => {
      // console.log(x);
      this.pickUpLoList = x;
    });
  }

  selectAddess(index) {
    this.activeItem = index;
  }
  confirmSelectAddess() {
    if (this.activeItem !== null) {
      const address = [];
      address.push({name: this.activeItem.categoryName , type: 'pickUp'});
      this.selectedAddress.emit(address);
    }
  }
}
