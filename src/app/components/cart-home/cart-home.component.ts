import { Component, OnInit, Input, Output , EventEmitter } from '@angular/core';
import { MerchantService } from 'src/app/services/merchant.service';
@Component({
  selector: 'app-cart-home',
  templateUrl: './cart-home.component.html',
  styleUrls: ['./cart-home.component.scss']
})
export class CartHomeComponent implements OnInit {
  @Input() cartPopUp: boolean;
  @Output() popUpStatus = new EventEmitter();
  public deliveryAddress = false;
  public pickUp = false;
  public totalOrder = 0;
  public totalPrice = 0;
  public errorPopUp = false;
  public errorCodeText = '';
  public selectedAddress: any;
  public showName: boolean;

  private token =  JSON.parse(localStorage.getItem('token'));
  // private apiKeyTest = 'APIKeyTest';
  constructor(private merchantService: MerchantService) {}

  ngOnInit(): void {
    this.merchantService.getCoupon(this.token.id).subscribe(x => {
      // console.log('666 customer coupon 666');
      // console.log(x);
    });
  }

  openPickUpPopUp(){
    this.pickUp = true;
    this.showName = false;
  }
  openAddressPopUp(){
    this.deliveryAddress = true;
  }
  closeCartPage(){
    this.cartPopUp = false;
    this.popUpStatus.emit(this.totalOrder);
  }
  closeAddress(name){
    this.cartPopUp = true;
    switch (name){
      case 'delivery': {
        this.deliveryAddress = false;
        break;
      }
      case 'pickUp': {
        this.pickUp = false;
      }
    }
  }
  renderSummary(event){
    this.totalOrder = event[0];
    this.totalPrice = event[1];
  }
  addressSelected(event){
    this.selectedAddress = event;
    this.showName = true;
    // console.log(this.selectedAddress);
    // this.pickUp = false;
    this.closeAddress(this.selectedAddress[0].type);
  }
  checkCouponCode(code){
    if (code !== '') {
      this.merchantService.updateUsedCoupon(this.token.id , code).subscribe(x => {
        // console.log(x);
      }, error => {
        const result = this.merchantService.checkErrorCoupon(error.error.code);
        // console.log(result);
        this.errorCodeText = result;
        this.errorPopUp = true;
      });
    }else {
      this.errorPopUp = true;
      this.errorCodeText = 'Emptry input.';
    }
  }
}
