import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {CustomerOrderService} from 'src/app/services/customer-order.service';
@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  @Output() getSummary = new EventEmitter();

  private token =  JSON.parse(localStorage.getItem('token'));

  public orderList: any;
  public menuSelected: any;
  public menuDelete: any;
  public groupOrderList: any;

  public totalSum: number;
  public totalOrder: number;

  public openPopUp: boolean;
  public deleteConfirmPopUp: boolean;
  public openErrorPopUp: boolean;

  public errorMessage: string;

  constructor(private customerOrderService: CustomerOrderService) {
  }

  ngOnInit(): void {
    this.openErrorPopUp = false;
    this.errorMessage = '';
    this.totalSum = 0;
    this.totalOrder = 0;
    this.customerOrderService.getCustomerOrderList(this.token.id).subscribe( x => {
      this.orderList = x;
      this.groupOrdering();
    });
  }
  groupOrdering(){
    const groupByName = {};
    this.orderList.forEach( a => {
      groupByName [a.merchant.childMstMerchantTranslation[0].name] = groupByName [a.merchant.childMstMerchantTranslation[0].name] || [];
      groupByName [a.merchant.childMstMerchantTranslation[0].name].push(
        { customerID: a.customerId, merchantID: a.merchantId, itemID: a.itemId ,
          itemName: a.item.childMstItemTranslation[0].itemName , itemAmount: a.amount,
          price: a.item.price , itemNote: a.note , sum: a.amount * a.item.price}
        );
      // console.log(a);
      this.totalSum = this.totalSum + (a.amount * a.item.price);
      this.totalOrder = this.totalOrder + a.amount;
    });
    this.groupOrderList = groupByName;
    this.getSummary.emit([this.totalOrder, this.totalSum]);
  }

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
  deleteConfirmation(vlaue){
    if (vlaue === true){
      this.customerOrderService.deleteOrder(this.menuDelete).subscribe( x => {
        if (x === 'SUCCESS'){
          this.deleteConfirmPopUp = false;
          this.menuDelete = {};
          this.ngOnInit();
        }
      });
    }else {
      this.deleteConfirmPopUp = false;
      this.menuDelete = {};
    }
  }
}
