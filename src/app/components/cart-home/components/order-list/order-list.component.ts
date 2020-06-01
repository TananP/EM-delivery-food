import { Component, OnInit } from '@angular/core';
import {CustomerOrderService} from 'src/app/services/customer-order.service'
@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  private token =  JSON.parse(localStorage.getItem('token'));
  public openPopUp: boolean;
  public orderList: any;
  public menuSelected: any;
  public menuDelete: any;
  public deleteConfirmPopUp: boolean;
  // test
  public groupOrderList: any;
  constructor(private customerOrderService: CustomerOrderService) { }

  ngOnInit(): void {
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
          price: a.item.price , itemNote: a.note}
        );
      // console.log(a);
    });
    this.groupOrderList = groupByName;
    // console.log(this.groupOrderList);
  }
  // ======

  editPopUp(name, customerID, merchantID, itemID, itemAmount , itemNote){
    this.openPopUp = true;
    this.menuSelected = {itemName: name, customerId: customerID, merchantId: merchantID,
      itemId: itemID, amount: itemAmount , note: itemNote};
    console.log(this.menuSelected);
    // this.menuSelected = menu;
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
      // console.log(x);
      this.closePopUp();
      this.ngOnInit();
    });
  }

  deleteOrder(customerID, merchantID, itemID, itemAmount){
    this.menuDelete = {customerId: customerID, merchantId: merchantID,
      itemId: itemID, amount: itemAmount};
    this.deleteConfirmPopUp = true;
    // console.log(customerOrder);
    // this.customerOrderService.deleteOrder(this.menuDelete ).subscribe( x => {
    //   // console.log(x);
    //   this.ngOnInit();
    // });
  }
  deleteConfirmation(vlaue){
    if (vlaue === true){
      this.customerOrderService.deleteOrder(this.menuDelete).subscribe( x => {
        console.log(x);
        this.deleteConfirmPopUp = false;
        this.menuDelete = {};
        this.ngOnInit();
      });
    }else {
      this.deleteConfirmPopUp = false;
      this.menuDelete = {};
    }
  }
}
