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
  public openLoadingPopUp = false;

  constructor(private merchantService: MerchantService) { }

  ngOnInit(): void {
    this.merchantService.getCategoryPickUp().subscribe(x => {
      // console.log(x);
      this.pickUpLoList = x;
      for (const index in this.pickUpLoList) {
        if (this.pickUpLoList[index].categoryId === 8) {
          this.selectAddess(this.pickUpLoList[index]);
        }
      }
    });
  }

  selectAddess(index) {
    this.activeItem = index;
  }
  confirmSelectAddess() {
    if (this.activeItem !== null) {
      this.openLoadingPopUp = true;
      const address = [];
      address.push({categoryId: this.activeItem.categoryId, deliveryPrice: 0 , name: this.activeItem.categoryName , type: 'pickUp'});
      this.openLoadingPopUp = false;
      this.selectedAddress.emit(address);
    }
  }
}
