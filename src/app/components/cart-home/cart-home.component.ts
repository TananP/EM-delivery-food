import { Component, OnInit, Input, Output , EventEmitter } from '@angular/core';
// import { MerchantService } from 'src/app/services/merchant.service';

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
  public totalDiscount = 0;
  public couponUsedList: any;
  public originalTotalPrice: number;
  // public customerID: number;
  public errorPopUp = false;
  public errorCodeText = '';
  public fullName = '';
  public mobileNumber = '';
  public selectedAddress: any;
  public showAdress: boolean;

  // private token =  JSON.parse(localStorage.getItem('token'));
  constructor() {}

  ngOnInit(): void {
    this.getUserInfo();
  }

  openPickUpPopUp(){
    this.pickUp = true;
    this.showAdress = false;
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

  // cancelCoupon(coupon){
  //   // this.customerID;
  //   // console.log(coupon.couponCode);
  //   this.merchantService.cancelCoupon(this.token.id , coupon.couponCode).subscribe(x => {
  //     // console.log(x);
  //     // this.ngOnInit();
  //     this.cartPopUp = false;
  //     this.cartPopUp = true;
  //   }, error => {
  //     const result = this.merchantService.checkErrorCoupon(error.error.code);
  //     // console.log(result);
  //     this.errorCodeText = result;
  //     this.errorPopUp = true;
  //   });
  // }
  renderSummary(event){
    // console.log(event);
    this.totalOrder = event[0];
    this.totalPrice = event[1];
    this.totalDiscount = event[2];
    this.couponUsedList = event[3];
    this.totalPrice = this.totalPrice - this.totalDiscount;
    this.originalTotalPrice = this.totalPrice;
  }

  addressSelected(event){
    this.selectedAddress = event;
    this.showAdress = true;
    this.totalPrice = this.originalTotalPrice;
    this.totalPrice = this.totalPrice + this.selectedAddress[0].deliveryPrice;
    this.closeAddress(this.selectedAddress[0].type);
  }

  // checkCouponCode(code){
  //   if (code !== '') {
  //     this.merchantService.updateUsedCoupon(this.token.id , code).subscribe(x => {
  //       // console.log(x);
  //       console.log(this.couponUsedList);
  //       this.cartPopUp = false;
  //       this.cartPopUp = true;
  //     }, error => {
  //       const result = this.merchantService.checkErrorCoupon(error.error.code);
  //       // console.log(result);
  //       this.errorCodeText = result;
  //       this.errorPopUp = true;
  //     });
  //   }else {
  //     this.errorPopUp = true;
  //     this.errorCodeText = 'Emptry input.';
  //   }
  // }

  getUserInfo(){
    const userProfile = JSON.parse(localStorage.getItem('userProfile'));
    // console.log('19199191991======== CartHome');
    // console.log(userProfile);
    if (userProfile === null) {
      // this.customerID = null;
      this.fullName = '-';
      this.mobileNumber = '-';
    } else {
      // this.customerID = userProfile.customerId;
      if (userProfile.fullName  == null){
        this.fullName = 'Your profile not have full name';
      }else{
        this.fullName = userProfile.fullName;
      }

      if (userProfile.mobileNumber  == null){
        this.mobileNumber = 'Your profile not mobile number';
      }else{
        this.mobileNumber = userProfile.mobileNumber;
      }
    }
  }
}
