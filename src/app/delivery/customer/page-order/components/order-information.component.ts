import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CustomerOrderService } from 'src/app/services/customer-order.service';

@Component({
  selector: 'app-order-information',
  templateUrl: './order-information.component.html',
  styleUrls: ['./order-information.component.scss']
})
export class OrderInformationComponent implements OnInit {
  @Input() orderNumber: number;
  // @Input() showOrderInfo: boolean;
  @Output() back = new EventEmitter();
  public selectOrderInfo: any;
  public orderList: any;
  public openLoadingPopUp: boolean;
  public errorCallApi = false;

  constructor(private customerOrderService: CustomerOrderService) { }

  ngOnInit(): void {
    this.selectOrderInfo = [];
    this.openLoadingPopUp = true;
    this.customerOrderService.getOrderDetail(this.orderNumber).subscribe( x => {
      this.selectOrderInfo = x;
      // console.log(this.selectOrderInfo);
      this.groupOrder();
    }, error => {
      this.openLoadingPopUp = false;
      this.errorCallApi = true;
    });
  }

  groupOrder(){
    const groupByName = [];
    this.orderList = [];
    // Order list
    this.selectOrderInfo.mstOrderItem.forEach( a => {
      if (a.merchantId !== null) {
        groupByName [a.merchantName] = groupByName [a.merchantName] || [];
        // customerID: a.customerId , sum: a.amount * a.item.price , active: a.active
        groupByName [a.merchantName].push(
          { merchantID: a.merchantId, itemID: a.itemId ,
            itemName: a.itemName , itemAmount: a.amount,
            price: a.priceAmount , itemNote: a.note}
          );
        // console.log(a);
      }
    });
    this.orderList = groupByName;
    this.openLoadingPopUp = false;
    // console.log(this.orderList);
  }
  backToOrderList(){
    this.back.emit();
  }
}
