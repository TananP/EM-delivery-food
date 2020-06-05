import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CustomerOrderService {
  baseUrl = environment.apiSysUrl;
  headers = new HttpHeaders().set('content-type', 'application/json');
  apiKey = 'TestAPIKey';
  token = localStorage.getItem('token');

  constructor(private http: HttpClient) {}

  addOrder(order){
    return this.http.post(this.baseUrl + 'web_api/api/CustomerOrder/InsertOrderItem', order , {
      headers: {
        'ApiKey' : this.apiKey,
        'Authorization': 'Bearer ' + this.token
      }
    });
  }
  deleteOrder(order){
    return this.http.post(this.baseUrl + 'web_api/api/CustomerOrder/DeleteOrderItem', order , {
      headers: {
        'ApiKey' : this.apiKey,
        'Authorization': 'Bearer ' + this.token
      }
    });
  }

  updateOrder(order){
    return this.http.post(this.baseUrl + 'web_api/api/CustomerOrder/UpdateOrderItem', order , {
      headers: {
        'ApiKey' : this.apiKey,
        'Authorization': 'Bearer ' + this.token
      }
    });
  }

  getCustomerOrderList(customerID){
    return this.http.get(this.baseUrl + 'web_api/api/CustomerOrder/GetAllOrderItem', { params: {
        customerId: customerID
      },
      headers: {
        'ApiKey' : this.apiKey,
        'Authorization': 'Bearer ' + this.token
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
    else {
      return 'Unknown error.';
    }
  }
}
