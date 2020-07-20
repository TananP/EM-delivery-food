import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { CustomerOrderService } from 'src/app/services/customer-order.service';
import {AuthorizationService} from 'src/app/services/authorization.service';

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
public openLoadingPopUp: boolean;
public errorCallApi = false;

  constructor(private customerOrderService: CustomerOrderService, private authorizationService: AuthorizationService) { }

  ngOnInit(): void {
    this.authorizationService.checkAuthorization();
    this.currentOrderList = [];
    this.getAllOrderStatus();
  }

  getAllOrderStatus(){
    // console.log('get order status api');
    this.openLoadingPopUp = true;
    this.customerOrderService.getCurrentOrder().subscribe( x => {
      this.currentOrderList = x;
      this.openLoadingPopUp = false;
      // console.log('Call get order api');
      if (this.currentOrderList.length > 0) {
        setTimeout(() => {
          this.getAllOrderStatus();
        }, 180000);
      }
    }, error => {
      console.log(error);
      this.openLoadingPopUp = false;
      this.errorCallApi = true;
    });
    // setTimeout(() => {
    //   this.getAllOrderStatus();
    // }, 10000);
  }

  // closeOrderPage(){
  //   this.closePopUp.emit();
  //   this.router.navigate(['/delivery']);
  // }

  selectOrder(orderID){
    this.selectOrderId = orderID;
    // console.log(this.selectOrderId);
    this.showOrderInfo = true;
  }

  backFromOrderInfo(){
    this.showOrderInfo = false;
  }
}
