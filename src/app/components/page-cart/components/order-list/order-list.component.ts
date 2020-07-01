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

  public orderList: any;
  public menuSelected: any;
  public menuDelete: any;
  public groupOrderList: any;
  public couponUsedList: any;

  public totalSum: number;
  public totalOrder: number;
  public totalDiscount: number;

  public openPopUp: boolean;
  public deleteConfirmPopUp: boolean;
  public openErrorPopUp: boolean;
  public haveItemOrder = false;
  public emptyItemOrder = false;
  public nowLoading = true;
  public openLoadingPopUp = false;

  public errorMessage: string;

  constructor(private merchantService: MerchantService, private customerOrderService: CustomerOrderService
            , private headerComponent: HeaderComponent) {
  }

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
      console.log(x);
      this.orderList = x;
      this.haveItemOrder = true;
      this.nowLoading = false;
      this.emptyItemOrder = false;
      this.groupOrdering();
      // this.sumDiscount();
    }, err => {
      // console.log(err);
      this.nowLoading = false;
      this.emptyItemOrder = true;
      const result = this.customerOrderService.checkErrorCode('LoadOrderFailed');
      // console.log(result);
      this.openErrorPopUp = true;
      this.errorMessage = result;
      if (err.status === 404) {
        this.couponUsedList = [];
        this.groupOrderList = [];
        this.haveItemOrder = false;
        this.getSummary.emit([this.totalOrder, this.totalSum, this.totalDiscount, this.couponUsedList, this.groupOrderList]);
      }
    });
  }
  groupOrdering(){
    const groupByName = [];
    this.couponUsedList = [];
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
    // console.log(this.groupOrderList);
    this.getSummary.emit([this.totalOrder, this.totalSum, this.totalDiscount, this.couponUsedList, this.groupOrderList]);
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
      this.merchantService.updateUsedCoupon(code).subscribe(x => {
        // console.log(x);
        this.getOrderList();
        this.openLoadingPopUp = false;
        // console.log(this.couponUsedList);
      }, error => {
        const result = this.merchantService.checkErrorCoupon(error.error.code);
        console.log(error.error.code);
        this.openLoadingPopUp = false;
        this.errorMessage = result;
        this.openErrorPopUp = true;
      });
    }else {
      this.openErrorPopUp = true;
      this.errorMessage = 'Emptry input.';
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
}
