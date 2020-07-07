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
    this.customerOrderService.getCurrentOrder().subscribe( x => {
      this.currentOrderList = x;
      // console.log(x);
    }, error => {
      console.log(error);
    });
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
