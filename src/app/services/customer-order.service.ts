import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CustomerOrderService {
  baseUrl = environment.apiSysUrl;
  headers = new HttpHeaders().set('content-type', 'application/json');
  apiKey = '24D4f704-3883-4E3c-95dd-F08cb822eb82';
  private token: any;
  constructor(private http: HttpClient) {}

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
    });
  }
  deleteOrder(order){
    this.getToken();
    return this.http.post(this.baseUrl + 'web_api/api/CustomerOrder/DeleteOrderItem', order , {
      headers: {
        'ApiKey' : this.apiKey,
        'Authorization': 'Bearer ' + this.token.token
      }
    });
  }

  updateOrder(order){
    this.getToken();
    return this.http.post(this.baseUrl + 'web_api/api/CustomerOrder/UpdateOrderItem', order , {
      headers: {
        'ApiKey' : this.apiKey,
        'Authorization': 'Bearer ' + this.token.token
      }
    });
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
    });
  }
  checkErrorCode(code){
    if (code === 'ITEM_001') {
      return 'Could not find this menu.';
    }
    else if (code === 'ITEM_002') {
      return 'This menu is out of order.';
    }
    else if (code === 'MERCHANT_001') {
      return 'Could not find this resterant.';
    }
    else if (code === 'MERCHANT_002') {
      return 'This resterant is not active.';
    }
    else if (code === 'MERCHANT_003') {
      return 'This resterant is close';
    }
    else if (code === 'LoadOrderFailed') {
      return 'Could no get order list please try again';
    }
    else {
      return 'Unknown error.';
    }
  }
}
