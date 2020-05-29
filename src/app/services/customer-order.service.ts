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

  constructor(private http: HttpClient) {
    if (this.token === null) {
      window.location.href = 'http://emfood.yipintsoi.com/web_api/api/Authentication/SigninLine';
    }
  }

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
}
