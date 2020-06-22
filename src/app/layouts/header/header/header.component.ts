import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
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
  // public token = JSON.parse(localStorage.getItem('token'));

  public orderAmount = 0;
  public cartPopUp: boolean;
  public profilePopUp: boolean;
  public historyPopUp: boolean;
  public orderPopUp: boolean;

  constructor(private customerOrderService: CustomerOrderService, private router: Router) {}

  ngOnInit(): void {
    this.cartPopUp = false;
    this.historyPopUp = false;
    this.profilePopUp = false;
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
  // linkToCartPage(){
  //   // console.log(this.router.url);
  //   // localStorage.setItem('previousURL', this.router.url);
  //   // this.router.navigate(['/delivery/cart-page']);
  // }
  openPopUp(popName: string , trigger: boolean){
    switch (popName){
        case 'cart':
          this.cartPopUp = true;
          break;

        case 'profile':
          this.profilePopUp = true;
          break;

        case 'history':
          this.historyPopUp = true;
          break;

        case 'order':
          this.orderPopUp = true;
          break;
    }
  }
  receviveStatus(event){
    this.orderAmount = event;
    document.getElementById('orderTotal').innerHTML = this.orderAmount.toString();
    this.cartPopUp = false;
  }
  closePopUp(){
    this.profilePopUp = false;
    this.orderPopUp = false;
    this.historyPopUp = false;
  }
  updateCarts(){
    const token = JSON.parse(localStorage.getItem('token'));
    // console.log(token);
    if (token !== null) {
      this.orderAmount = 0;
      this.customerOrderService.getCustomerOrderList().subscribe( x => {
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
    // this.orderAmount = 0;
    // this.customerOrderService.getCustomerOrderList().subscribe( x => {
    //   this.orderList = x;
    //   console.log(x);
    //   this.getSumNumberOrder();
    //   document.getElementById('orderTotal').innerHTML = this.orderAmount.toString();
    // }, error => {
    //   console.log(error);
    //   this.orderAmount = 0;
    //   document.getElementById('orderTotal').innerHTML = this.orderAmount.toString();
    // });
  // }
}
