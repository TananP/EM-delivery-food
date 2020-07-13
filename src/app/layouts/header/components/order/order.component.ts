import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { CustomerOrderService } from 'src/app/services/customer-order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
@Input() orderPopUp: boolean;
@Output() closePopUp = new EventEmitter();
public showOrderInfo = false;
public currentOrderList: any;
public selectOrderId: number;

  constructor(private customerOrderService: CustomerOrderService) { }

  ngOnInit(): void {
    this.currentOrderList = [];
    this.getAllOrderStatus();
  }

  getAllOrderStatus(){
    // console.log('get order status api');
    this.customerOrderService.getCurrentOrder().subscribe( x => {
      this.currentOrderList = x;
      // console.log(this.currentOrderList.length);
      if (this.currentOrderList.length > 0) {
    // setTimeout(() => {
    //   this.getAllOrderStatus();
    // }, 10000);
      }
    }, error => {
      console.log(error);
    });
    // setTimeout(() => {
    //   this.getAllOrderStatus();
    // }, 10000);
  }

  closeOrderPage(){
    this.closePopUp.emit();
  }

  selectOrder(orderInfo){
    this.selectOrderId = orderInfo;
    this.showOrderInfo = true;
  }

  backFromOrderInfo(){
    this.showOrderInfo = false;
  }
}
