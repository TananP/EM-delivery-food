import { Component, OnInit, Input, Output , EventEmitter } from '@angular/core';
// import { Router } from '@angular/router';
// import { filter, pairwise } from 'rxjs/operators';
// import { MerchantService } from 'src/app/services/merchant.service';
import {CustomerOrderService} from 'src/app/services/customer-order.service';
import {Location} from '@angular/common';
// Test
import {TestService} from 'src/app/services/test.service';

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
  public removeOrderPopUp = false;
  public openLoadingPopUp = false;
  public errorPopUp = false;

  public totalOrder = 0;
  public totalPrice = 0;
  public totalDiscount = 0;

  public couponUsedList: any;
  public selectedAddress: any;
  public checkOrderResult: any;
  public originalTotalPrice: number;
  public showAdress: boolean;

  public errorCodeText = '';
  public fullName = '';
  public mobileNumber = '';


  // private token =  JSON.parse(localStorage.getItem('token'));
  constructor(private location: Location, private customerOrderService: CustomerOrderService, private testService: TestService) {}

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
    this.location.back();
    // const previousURL = localStorage.getItem('previousURL');
    // this.router.navigate([previousURL]);
    // this.cartPopUp = false;
    // this.popUpStatus.emit(this.totalOrder);
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
    // console.log(event);
    this.totalOrder = event[0];
    this.totalPrice = event[1];
    this.totalDiscount = event[2];
    this.couponUsedList = event[3];
    this.totalPrice = this.totalPrice - this.totalDiscount;
    this.originalTotalPrice = this.totalPrice;
  }

  addressSelected(event){
    // console.log();
    this.selectedAddress = event[0];
    this.showAdress = true;
    this.totalPrice = this.originalTotalPrice;
    this.totalPrice = this.totalPrice + this.selectedAddress.deliveryPrice;
    this.closeAddress(this.selectedAddress.type);
  }


  getUserInfo(){
    const userProfile = JSON.parse(localStorage.getItem('userProfile'));
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

  confirmOrder(){
    // console.log(this.selectedAddress);
    // console.log('==================');
    this.openLoadingPopUp = true;
    if (this.selectedAddress === undefined) {
      this.openLoadingPopUp = false;
      this.errorPopUp = true;
      this.errorCodeText = 'Please select address.';
    }else {
      const token = JSON.parse(localStorage.getItem('token'));
      if (this.selectedAddress.type === 'delivery'){
        const oderConfirmList = {customerId: token.id , deliveryType: 'D' ,
          deliveryId: this.selectedAddress.addressId, deliveryPrice: this.selectedAddress.deliveryPrice};
        // console.log(oderConfirmList);
        this.checkWithAPI(oderConfirmList);
      } else if (this.selectedAddress.type === 'pickUp') {
        const oderConfirmList = {customerId: token.id, deliveryType: 'P' ,
          deliveryId: this.selectedAddress.categoryId, deliveryPrice: 0};
        console.log(oderConfirmList);
        this.checkWithAPI(oderConfirmList);
      }
    }
    // console.log(this.selectedAddress);
  }

  checkWithAPI(order){
    this.customerOrderService.checkOrder(order).subscribe( x => {
      this.checkOrderResult = x;
      // console.log(this.checkOrderResult);
      this.openLoadingPopUp = false;
      if (this.checkOrderResult.result) {
        this.paymentMethod(this.checkOrderResult);
      } else {
        this.removeOrderPopUp = true;
      }
    }, error => {
      this.openLoadingPopUp = false;
      console.log(error);
      this.errorPopUp = true;
      this.errorCodeText = error.error.error;
    });
  }

  removeErrorOrder(){
    this.customerOrderService.removeErrorOrder().subscribe( x => {
      console.log(x);
      this.removeOrderPopUp = false;
    }, error => {
      this.removeOrderPopUp = false;
      console.log(error);
      this.errorPopUp = true;
      this.errorCodeText = error.error.error;
    });
  }

  paymentMethod(order){
    const param = order;
    console.log(param);
    // window.open = 'http://emfood.yipintsoi.com/web_api/CustomerPayment';
    this.testService.redirectWithPost('http://emfood.yipintsoi.com/web_api/CustomerPayment', order);
    // window.location.href = 'http://emfood.yipintsoi.com/web_api/CustomerPayment';

    // console.log(order);
    // this.customerOrderService.customerPayment(order);
    // this.customerOrderService.customerPayment(order).subscribe( x => {
    //   console.log(x);
    // }, error => {
    //   console.log(error);
    // });
  }
}
