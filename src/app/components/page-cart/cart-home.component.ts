import { Component, OnInit, Input, Output , EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
// import { filter, pairwise } from 'rxjs/operators';
// import { MerchantService } from 'src/app/services/merchant.service';
import {CustomerOrderService} from 'src/app/services/customer-order.service';
import { CustomerAddressService } from 'src/app/services/customer-address.service';
import {AuthorizationService} from 'src/app/services/authorization.service';
import {Location} from '@angular/common';
import {ProfileComponent} from 'src/app/layouts/header/components/profile/profile.component';
import { SubmitFormService } from 'src/app/services/submit-form.service';
// Test
// import {TestService} from 'src/app/services/test.service';
import { OrderListComponent } from './components/order-list/order-list.component';
import { HeaderComponent } from 'src/app/layouts/header/header/header.component';

@Component({
  selector: 'app-cart-home',
  templateUrl: './cart-home.component.html',
  styleUrls: ['./cart-home.component.scss']
})

export class CartHomeComponent implements OnInit {
  @Input() cartPopUp: boolean;
  @Output() popUpStatus = new EventEmitter();
  @ViewChild(OrderListComponent) orderListComponent: OrderListComponent;

  public deliveryAddress = false;
  public editProfile = false;
  public editAddress = false;
  public pickUp = false;
  // public removeOrderPopUp = false;
  public openLoadingPopUp = false;
  public errorPopUp = false;
  public errorPopUpLoadindImg = false;
  public orderRemoveNotification = false;
  // public orderError = false;

  public totalOrder = 0;
  public totalPrice = 0;
  public totalDiscount = 0;

  public couponUsedList: any;
  public errorList: any;
  public selectedAddress: any;
  public checkOrderResult: any;
  private userProfile: any;
  public originalTotalPrice: number;
  public sumPrice: number;
  public showAdress: boolean;
  public nameValue: string;
  public mobileValue: string;

  public errorCodeText = '';
  public fullName = '';
  public mobileNumber = '';


  // private token =  JSON.parse(localStorage.getItem('token'));
  constructor(private location: Location, private customerOrderService: CustomerOrderService, private submitFormService: SubmitFormService,
              private router: Router, private authorizationService: AuthorizationService, private profileComponent: ProfileComponent,
              private customerAddressService: CustomerAddressService, private headerComponent: HeaderComponent) {
                this.authorizationService.checkAuthorization();
              }

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
    this.headerComponent.updateCarts();
    this.router.navigate(['/delivery']);
    // this.location.back();
    // const previousURL = localStorage.getItem('previousURL');
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
    // console.log(this.selectedAddress);
    this.totalOrder = event[0];
    this.totalPrice = event[1];
    this.totalDiscount = event[2];
    this.couponUsedList = event[3];
    this.errorList = event[4];
    this.sumPrice = this.totalPrice;
    this.totalPrice = this.totalPrice - this.totalDiscount;
    this.originalTotalPrice = this.totalPrice;
    if (this.selectedAddress === undefined) {
      this.totalPrice = this.totalPrice + 0;
    }else {
      this.totalPrice = this.totalPrice + this.selectedAddress.deliveryPrice;
    }
  }

  addressSelected(event){
    // console.log(event);
    this.selectedAddress = event[0];
    this.showAdress = true;
    this.totalPrice = this.originalTotalPrice;
    this.totalPrice = this.totalPrice + this.selectedAddress.deliveryPrice;
    this.closeAddress(this.selectedAddress.type);
  }


  getUserInfo(){
    this.userProfile = JSON.parse(localStorage.getItem('userProfile'));
    if (this.userProfile === null) {
      // this.customerID = null;
      this.fullName = '-';
      this.mobileNumber = '-';
    } else {
      // this.customerID = userProfile.customerId;
      if (this.userProfile.fullName  == null){
        this.fullName = 'Your profile not have full name';
      }else{
        this.fullName = this.userProfile.fullName;
      }

      if (this.userProfile.mobileNumber  == null){
        this.mobileNumber = 'Your profile not mobile number';
      }else{
        this.mobileNumber = this.userProfile.mobileNumber;
      }
    }
  }

  editProfileFunc(){
    if (this.fullName === 'Your profile not have full name') {
      this.nameValue = '';
    }else {
      this.nameValue = this.fullName;
    }
    if (this.mobileNumber === 'Your profile not have mobile number') {
      this.mobileValue = '';
    }else {
      this.mobileValue = this.mobileNumber.toString();
    }
    this.editProfile = true;
  }

  confirmEditProfile(fullName , mobileNumber){
    if (fullName !== '' && mobileNumber !== '') {
        this.authorizationService.updateLineIdInfo(fullName, mobileNumber).subscribe( x => {
        this.userProfile.fullName = fullName;
        this.userProfile.mobileNumber = mobileNumber;
        this.fullName = fullName;
        this.mobileNumber = mobileNumber;
        localStorage.setItem('userProfile' , JSON.stringify(this.userProfile));
        // this.profileComponent.getUserInfo();
        this.profileComponent.getUserInfo();
        this.editProfile = false;
      }, error => {
        console.log(error);
      });
    }
  }

  editAdressFunc(){
    this.editAddress = true;
  }

  confirmEditaddress(type, detail, note){
    // console.log(this.selectedAddress);
    const editAddress = this.selectedAddress;
    editAddress.name = type;
    editAddress.detail = detail;
    editAddress.note = note;
    this.customerAddressService.updateAddress(editAddress).subscribe( x => {
      this.editAddress = false;
      this.openLoadingPopUp = false;
      this.selectedAddress = editAddress;
      this.editAddress = false;
    }, error => {
      this.openLoadingPopUp = false;
      const result = this.customerAddressService.checkErrorCode(error.error.code);
      this.errorPopUp = true;
      this.errorCodeText = result;
    });
    // console.log(editAddress);
  }

  confirmOrder(){
    this.openLoadingPopUp = true;
    if (this.selectedAddress === undefined) {
      this.openLoadingPopUp = false;
      this.errorPopUp = true;
      this.errorCodeText = 'Please select address.';
    } else if (this.fullName === '' || this.fullName === 'Your profile not have full name'
               || this.mobileNumber === '' || this.mobileNumber === 'Your profile not mobile number') {
      this.openLoadingPopUp = false;
      this.errorPopUp = true;
      this.errorCodeText = 'Please informed your name and mobile number';
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
        // console.log(oderConfirmList);
        this.checkWithAPI(oderConfirmList);
      }
    }
    // console.log(this.selectedAddress);
  }

  // removeErrorOrder(){
  //   // this.customerOrderService.removeErrorOrder().subscribe( x => {
  //   //   // console.log(x);
  //   //   this.removeOrderPopUp = false;
  //   //   this.headerComponent.updateCarts();
  //   //   // this.orderListComponent.getOrderList();
  //   //   this.orderListComponent.ngOnInit();
  //   // }, error => {
  //   //   this.removeOrderPopUp = false;
  //   //   // console.log(error);
  //   //   this.errorPopUp = true;
  //   //   this.errorCodeText = error.error.error;
  //   // });
  // }

  checkWithAPI(order){
    if (this.errorList === 0) {
        this.customerOrderService.checkOrder(order).subscribe( x => {
        this.checkOrderResult = x;
        this.openLoadingPopUp = false;
        if (this.checkOrderResult.result) {
          this.paymentMethod(this.checkOrderResult);
        } else {
          // this.removeOrderPopUp = true;
          this.orderListComponent.showOrderErrorBeforePayment();
        }
      }, error => {
        // console.log(error);
        // console.log(this.couponUsedList);
        this.openLoadingPopUp = false;
        let errorCode = error.error.code;
        errorCode = errorCode.slice(errorCode.length - 3);
        const errorCodeNumber = Number(errorCode);
        // Error Order
        if (errorCodeNumber >= 1 && errorCodeNumber <= 6) {
          this.orderListComponent.ngOnInit();
          this.headerComponent.updateCarts();
          this.errorPopUp = true;
          this.errorPopUpLoadindImg = true;
          const result = this.customerOrderService.checkErrorCode(error.error.code);
          if (result === 'unknown error') {
            this.errorCodeText = error.error.error;
          }else {
            this.errorCodeText = result;
          }
          setTimeout( () => {
            this.orderListComponent.showOrderErrorBeforePayment();
            this.errorPopUp = false;
            this.errorPopUpLoadindImg = false;
          }, 2000);
        }
        // Error Coupon
        if (errorCodeNumber >= 11 && errorCodeNumber <= 16) {
          this.errorPopUp = true;
          // this.errorPopUpLoadindImg = true;
          const result = this.customerOrderService.checkErrorCode(error.error.code);
          if (result === 'unknown error') {
            this.errorCodeText = error.error.error;
          }else {
            this.errorCodeText = result;
          }
          // console.log(this.couponUsedList[0].couponCode);
          this.orderListComponent.cancelCoupon(this.couponUsedList[0]);
        }
      });
    }else {
      this.openLoadingPopUp = false;
      this.orderListComponent.showOrderErrorBeforePayment();
    }

  }

  paymentMethod(order){
    this.orderRemoveNotification = true;
    setTimeout( () => {
      this.submitFormService.redirectWithPost('http://emfood.yipintsoi.com/web_api/CustomerPayment', order);
    }, 2000);
  }
}
