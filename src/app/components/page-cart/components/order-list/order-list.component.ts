import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {CustomerOrderService} from 'src/app/services/customer-order.service';
import { HeaderComponent } from 'src/app/layouts/header/header/header.component';
import { MerchantService } from 'src/app/services/merchant.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  @Output() getSummary = new EventEmitter();

  // private token =  JSON.parse(localStorage.getItem('token'));

  public menuSelected: any;
  public menuDelete: any;
  public orderList: any;
  public groupOrderList: any;
  public couponUsedList: any;
  public errorList: any;

  public totalSum: number;
  public totalOrder: number;
  public totalDiscount: number;

  public openPopUp: boolean;
  public deleteConfirmPopUp: boolean;
  public openErrorPopUp: boolean;
  public orderError = false;
  public haveItemOrder = false;
  public emptyItemOrder = false;
  public nowLoading = true;
  public openLoadingPopUp = false;

  public errorMessage: string;
  constructor(private merchantService: MerchantService, private customerOrderService: CustomerOrderService
            , private headerComponent: HeaderComponent) {}

  ngOnInit(): void {
    this.openErrorPopUp = false;
    this.errorMessage = '';
    this.getOrderList();
  }
  getOrderList(){
    this.totalSum = 0;
    this.totalOrder = 0;
    this.totalDiscount = 0;
    this.customerOrderService.getCustomerOrderList().subscribe( x => {
      // console.log(x);
      this.orderList = x;
      this.haveItemOrder = true;
      this.nowLoading = false;
      this.emptyItemOrder = false;
      this.checkOrderActive();
      this.groupOrdering();
      // this.sumDiscount();
    }, err => {
      this.nowLoading = false;
      this.emptyItemOrder = true;
      // const result = err.error.error;
      // this.openErrorPopUp = true;
      // this.errorMessage = 'No order in your cart / order in your cart will be removed after confirm order.';
      // this.errorMessage = result;
      // if (err.status === 404) {
      //   this.couponUsedList = [];
      //   this.groupOrderList = [];
      //   this.errorList = [];
      //   this.haveItemOrder = false;
      //   this.getSummary.emit([this.totalOrder, this.totalSum, this.totalDiscount, this.couponUsedList, this.errorList.length]);
      // }
      this.couponUsedList = [];
      this.groupOrderList = [];
      this.errorList = [];
      this.haveItemOrder = false;
      this.getSummary.emit([this.totalOrder, this.totalSum, this.totalDiscount, this.couponUsedList, this.errorList.length]);

    });
  }
  groupOrdering(){
    const groupByName = [];
    this.couponUsedList = [];
    // console.log('Refresh!!!');
    // Order list
    this.orderList.cusCartOrder.forEach( a => {
      groupByName [a.merchant.childMstMerchantTranslation[0].name] = groupByName [a.merchant.childMstMerchantTranslation[0].name] || [];
      groupByName [a.merchant.childMstMerchantTranslation[0].name].push(
        { customerID: a.customerId, merchantID: a.merchantId, itemID: a.itemId ,
          itemName: a.item.childMstItemTranslation[0].itemName , itemAmount: a.amount,
          price: a.item.price , itemNote: a.note , sum: a.amount * a.item.price , active: a.active}
        );
      // console.log(a);
      this.totalSum = this.totalSum + (a.amount * a.item.price);
      this.totalOrder = this.totalOrder + a.amount;
    });
    // Coupon list
    this.orderList.couponUsed.forEach( a => {
      this.couponUsedList.push({couponCode: a.coupon.couponCode, discountAmount: a.coupon.discountAmount});
      this.totalDiscount = this.totalDiscount + a.coupon.discountAmount;
    });
    this.groupOrderList = groupByName;
    // console.log('================ + ===============');
    // console.log(this.errorList);
    // this.getSummary.emit([this.totalOrder, this.totalSum, this.totalDiscount,
    //   this.couponUsedList, this.groupOrderList , this.errorList]);
    this.getSummary.emit([this.totalOrder, this.totalSum, this.totalDiscount, this.couponUsedList , this.errorList.length]);
  }

  checkOrderActive(){
    this.errorList = [];
    const currentTime = Date().split(' ')[4];
    this.orderList.cusCartOrder.forEach( a => {
      // console.log(a);
      let openTime = a.merchant.openTime;
      let closeTime = a.merchant.closeTime;
      if (openTime === null) {
        openTime = '10:00:00';
      }
      if (closeTime === null) {
        closeTime = '22:00:00';
      }
      if (a.active === false || a.item.active === false) {
        this.errorList.push({orderName: a.item.childMstItemTranslation[0].itemName ,
          merchantName: a.merchant.childMstMerchantTranslation[0].name  , error: 'Menu temporary unavailable'});
      }
      // if (a.item.active === false) {
      //   this.errorList.push({orderName: a.item.childMstItemTranslation[0].itemName , error: 'Menu temporary unavailable'});
      // }
      if (a.merchant.active === false) {
        this.errorList.push({orderName: a.item.childMstItemTranslation[0].itemName ,
          merchantName: a.merchant.childMstMerchantTranslation[0].name , error: 'Restaurants temporary unavailable'});
      }
      if (currentTime <= openTime && currentTime >= closeTime) {
        this.errorList.push({orderName: a.item.childMstItemTranslation[0].itemName,
          merchantName: a.merchant.childMstMerchantTranslation[0].name , error: 'Shop close'});
      }
      // console.log(this.errorList);
      // if (this.errorList.length > 0) {
      //   this.orderError = true;
      // }
    });
  }

  showOrderErrorBeforePayment(){
    this.orderError = true;
    // if (this.errorList.length > 0) {
    //   this.orderError = true;
    // }else {
    //   this.orderError = false;
    // }
  }

  // sumDiscount(){
  //   this.couponUsedList = [];
  //   this.orderList.couponUsed.forEach( a => {
  //     this.couponUsedList.push({couponCode: a.coupon.couponCode, discountAmount: a.coupon.discountAmount});
  //     this.totalDiscount = this.totalDiscount + a.coupon.discountAmount;
  //   });
  //   console.log(this.couponUsedList);
  // }

  editPopUp(name, customerID, merchantID, itemID, itemAmount , itemNote){
    this.openPopUp = true;
    this.menuSelected = {itemName: name, customerId: customerID, merchantId: merchantID,
      itemId: itemID, amount: itemAmount , note: itemNote};
  }

  closePopUp(){
    this.openPopUp = false;
    this.menuSelected = {};
  }

  changeDishNumber(order: string){
    if (order === 'add'){
      this.menuSelected.amount += 1;
      // this.totalPrice = this.menuSelected.price * this.numberEachDish;
    }
    if (order === 'minus') {
      if (this.menuSelected.amount === 1){
        this.menuSelected.amount = 1 ;
      }else{
        this.menuSelected.amount -= 1;
        // this.totalPrice = this.menuSelected.price * this.numberEachDish;
      }
    }
  }

  updateMenu(itemNote){
    this.menuSelected.note = itemNote;
    this.customerOrderService.updateOrder(this.menuSelected).subscribe( x => {
      this.closePopUp();
      this.headerComponent.updateCarts();
      this.ngOnInit();
    } , error => {
      const result = this.customerOrderService.checkErrorCode(error.error.code);
      // console.log(result);
      this.openErrorPopUp = true;
      this.errorMessage = result;
      this.closePopUp();
    });
  }

  deleteOrder(customerID, merchantID, itemID, itemAmount){
    this.menuDelete = {customerId: customerID, merchantId: merchantID,
      itemId: itemID, amount: itemAmount};
    this.deleteConfirmPopUp = true;
  }
  deleteConfirmation(value){
    if (value === true){
      this.customerOrderService.deleteOrder(this.menuDelete).subscribe( x => {
        if (x === 'SUCCESS'){
          this.deleteConfirmPopUp = false;
          this.menuDelete = {};
          this.headerComponent.updateCarts();
          // this.ngOnInit();
        }
        this.ngOnInit();
      });
    }else {
      this.deleteConfirmPopUp = false;
      this.menuDelete = {};
    }
  }

  checkCouponCode(code){
    if (code !== '') {
      // const token =  JSON.parse(localStorage.getItem('token'));
      this.openLoadingPopUp = true;
      if (this.couponUsedList.length < 1) {
        this.merchantService.updateUsedCoupon(code).subscribe(x => {
          // console.log(x);
          this.getOrderList();
          this.openLoadingPopUp = false;
          // console.log(this.couponUsedList);
        }, error => {
          let result = '';
          if ( error.error.code === 'COUPON_007') {
            result = error.error.error;
          }else {
            result = this.merchantService.checkErrorCoupon(error.error.code);
          }
          // console.log(error);
          this.openLoadingPopUp = false;
          this.errorMessage = result;
          this.openErrorPopUp = true;
        });
      }else {
        this.openLoadingPopUp = false;
        this.errorMessage = 'Coupon uesd at limit.';
        this.openErrorPopUp = true;
      }
    }else {
      this.openErrorPopUp = true;
      this.errorMessage = 'Emptry input .';
    }
  }

  cancelCoupon(coupon){
    // this.customerID;
    // console.log(coupon.couponCode);
    // const token =  JSON.parse(localStorage.getItem('token'));
    this.openLoadingPopUp = true;
    this.merchantService.cancelCoupon(coupon.couponCode).subscribe(x => {
      this.getOrderList();
      this.openLoadingPopUp = false;
      // console.log(x);
      // this.ngOnInit();
    }, error => {
      const result = this.merchantService.checkErrorCoupon(error.error.code);
      // console.log(result);
      this.openLoadingPopUp = false;
      this.errorMessage = result;
      this.openErrorPopUp = true;
    });
  }

  removeErrorOrder(){
    this.customerOrderService.removeErrorOrder().subscribe( x => {
      // console.log(x);
      this.headerComponent.updateCarts();
      // this.groupOrdering();
      this.ngOnInit();
      this.orderError = false;
    }, error => {
      // console.log(error);
      this.openErrorPopUp = true;
      this.errorMessage = error.error.error;
      this.orderError = false;
    });
  }
}
