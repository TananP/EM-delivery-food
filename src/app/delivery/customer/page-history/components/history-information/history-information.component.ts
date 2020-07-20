import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CustomerOrderService } from 'src/app/services/customer-order.service';

@Component({
  selector: 'app-history-information',
  templateUrl: './history-information.component.html',
  styleUrls: ['./history-information.component.scss']
})
export class HistoryInformationComponent implements OnInit {
  @Input() orderNumber: number;
  @Output() back = new EventEmitter();
  public selectHistoryInfo: any;
  public orderList: any;
  public openLoadingPopUp: boolean;
  public errorCallApi = false;

  constructor(private customerOrderService: CustomerOrderService) {}

  ngOnInit(): void {
    // this.selectHistoryInfo = this.historyInfo;
    this.selectHistoryInfo = [];
    this.openLoadingPopUp = true;
    // console.log(this.orderNumber);
    this.customerOrderService.getOrderDetail(this.orderNumber).subscribe( x => {
      this.selectHistoryInfo = x;
      // console.log(x);
      this.groupOrder();
      this.openLoadingPopUp = false;
    }, error => {
      this.openLoadingPopUp = false;
      this.errorCallApi = true;
    });
  }

  groupOrder(){
    const groupByName = [];
    this.orderList = [];
    // Order list
    this.selectHistoryInfo.mstOrderItem.forEach( a => {
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
    // console.log(this.orderList);
  }
  backToHistoryList(){
    this.back.emit();
  }
}
