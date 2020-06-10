import { Component, OnInit, Input } from '@angular/core';
import {CustomerOrderService} from 'src/app/services/customer-order.service';

import { Injectable } from '@angular/core';
@Injectable({providedIn: 'root'})

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() taskData: string;
  @Input() searchPage: boolean;

  public orderList: any;
  public token = JSON.parse(localStorage.getItem('token'));

  public orderAmount = 0;
  public cartPopUp: boolean;
  public historyPopUp: boolean;
  public orderPopUp: boolean;

  constructor(private customerOrderService: CustomerOrderService) {}

  ngOnInit(): void {
    this.cartPopUp = false;
    this.historyPopUp = false;
    this.orderPopUp = false;
    this.updateCarts();
  }
  getSumNumberOrder(){
    this.orderList.cusCartOrder.forEach( a => {
      this.orderAmount = this.orderAmount + a.amount;
    });
  }
  openMenu(trigger: boolean){
    if (trigger) {
      document.getElementById('sideMenu').style.width = '12.5rem';
    } else {
      document.getElementById('sideMenu').style.width = '0px';
    }
  }
  openPopUp(popName: string , trigger: boolean){
    switch (popName){
        case 'cart':
          this.cartPopUp = true;
          break;

        // case 'history':
        //   if (trigger){
        //     this.historyPopUp = true;
        //   }else{
        //     this.historyPopUp = false;
        //   }
        //   break;

        case 'order':
          if (trigger){
            this.orderPopUp = true;
          }else{
            this.orderPopUp = false;
          }
          break;
    }
  }
  receviveStatus(event){
    this.orderAmount = event;
    document.getElementById('orderTotal').innerHTML = this.orderAmount.toString();
    this.cartPopUp = false;
  }
  updateCarts(){
    if (this.token !== null) {
      this.orderAmount = 0;
      this.customerOrderService.getCustomerOrderList(this.token.id).subscribe( x => {
        this.orderList = x;
        // console.log(x);
        this.getSumNumberOrder();
        document.getElementById('orderTotal').innerHTML = this.orderAmount.toString();
      }, error => {
        console.log(error);
        this.orderAmount = 0;
        document.getElementById('orderTotal').innerHTML = this.orderAmount.toString();
      });
    }
  }
}
