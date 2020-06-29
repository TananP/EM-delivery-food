import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { timeout } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CustomerOrderService {
  baseUrl = environment.apiSysUrl;
  headers = new HttpHeaders().set('content-type', 'application/json');
  apiKey = '24D4f704-3883-4E3c-95dd-F08cb822eb82';
  private token: any;
  constructor(private http: HttpClient) {}
  timeOut = 10000;

  getToken(){
    this.token = JSON.parse(localStorage.getItem('token'));
  }

  addOrder(order){
    this.getToken();
    return this.http.post(this.baseUrl + 'web_api/api/CustomerOrder/InsertOrderItem', order , {
      headers: {
        'ApiKey' : this.apiKey,
        'Authorization': 'Bearer ' + this.token.token
      }
    }).pipe(timeout(this.timeOut));
  }
  deleteOrder(order){
    this.getToken();
    return this.http.post(this.baseUrl + 'web_api/api/CustomerOrder/DeleteOrderItem', order , {
      headers: {
        'ApiKey' : this.apiKey,
        'Authorization': 'Bearer ' + this.token.token
      }
    }).pipe(timeout(this.timeOut));
  }

  updateOrder(order){
    this.getToken();
    return this.http.post(this.baseUrl + 'web_api/api/CustomerOrder/UpdateOrderItem', order , {
      headers: {
        'ApiKey' : this.apiKey,
        'Authorization': 'Bearer ' + this.token.token
      }
    }).pipe(timeout(this.timeOut));
  }

  getCustomerOrderList(){
    this.getToken();
    return this.http.get(this.baseUrl + 'web_api/api/CustomerOrder/GetAllOrderItem', { params: {
        customerId: this.token.id
      },
      headers: {
        'ApiKey' : this.apiKey,
        'Authorization': 'Bearer ' + this.token.token
      }
    }).pipe(timeout(this.timeOut));
  }

  getOrderHistory(){
    this.getToken();
    return this.http.post(this.baseUrl + 'web_api/api/CustomerOrder/GetOrderHistory', { params: {
      customerId: this.token.id
    },
    headers: {
        'ApiKey' : this.apiKey,
        'Authorization': 'Bearer ' + this.token.token
      }
    }).pipe(timeout(this.timeOut));
  }

  getCurrentOrder(){
    this.getToken();
    return this.http.post(this.baseUrl + 'web_api/api/CustomerOrder/GetOrderCurrent', { params: {
      customerId: this.token.id
    },
    headers: {
        'ApiKey' : this.apiKey,
        'Authorization': 'Bearer ' + this.token.token
      }
    }).pipe(timeout(this.timeOut));
  }

  checkOrder(order){
    this.getToken();
    return this.http.post(this.baseUrl + 'web_api/api/CustomerOrder/CheckOrder', order , { headers: {
        'ApiKey' : this.apiKey,
        'Authorization': 'Bearer ' + this.token.token
      }
    }).pipe(timeout(this.timeOut));
  }

  removeErrorOrder(){
    this.getToken();
    return this.http.post(this.baseUrl + 'web_api/api/CustomerOrder/CheckOrder', { params: {
      customerId: this.token.id
    },
    headers: {
        'ApiKey' : this.apiKey,
        'Authorization': 'Bearer ' + this.token.token
      }
    }).pipe(timeout(this.timeOut));
  }

  customerPayment(order){
    this.getToken();
    console.log(order);
    return this.http.post(this.baseUrl + 'web_api/CustomerPayment', order , { headers: {
        'ApiKey' : this.apiKey,
        'Authorization': 'Bearer ' + this.token.token
      }
    }).pipe(timeout(this.timeOut));
  }


  checkErrorCode(code){
    // if (code === 'ITEM_001') {
    //   return 'Could not find this menu.';
    // }
    // else if (code === 'MERCHANT_001') {
    //   return 'Could not find this resterant.';
    // }
    // else if (code === 'MERCHANT_002') {
    //   return 'This resterant is not active.';
    // }
    if (code === 'ITEM_002') {
      return 'This menu is out of order.';
    }
    else if (code === 'MERCHANT_003') {
      return 'This resterant is close';
    }
    else if (code === 'LoadOrderFailed') {
      return 'Could no get orderlist please try again';
    }
    else {
      return 'Error please try again later.';
    }
  }
}
