import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { timeout } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CustomerOrderService {
  baseUrl = environment.apiSysUrl;
  apiKey = environment.apiKey;
  headers = new HttpHeaders().set('content-type', 'application/json');
  // apiKey = '24D4f704-3883-4E3c-95dd-F08cb822eb82';
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
    return this.http.get(this.baseUrl + 'web_api/api/CustomerOrder/GetOrderHistory', { params: {
      customerId: this.token.id,
      pageLength: '10'
    },
    headers: {
        'ApiKey' : this.apiKey,
        'Authorization': 'Bearer ' + this.token.token
      }
    }).pipe(timeout(this.timeOut));
  }

  getCurrentOrder(){
    this.getToken();
    return this.http.get(this.baseUrl + 'web_api/api/CustomerOrder/GetOrderCurrent', { params: {
      customerId: this.token.id
    },
    headers: {
        'ApiKey' : this.apiKey,
        'Authorization': 'Bearer ' + this.token.token
      }
    }).pipe(timeout(this.timeOut));
  }

  getOrderDetail(orderID) {
    // console.log(orderID);
    return this.http.get(this.baseUrl + 'web_api/api/CustomerOrder/GetOrderDetail', { params: {
      customerId: this.token.id,
      orderId: orderID
    },
    headers: {
        'ApiKey' : this.apiKey,
        'Authorization': 'Bearer ' + this.token.token
      }
    }).pipe(timeout(this.timeOut));
  }

  // checkStatusByOrderNumber(ordernumber){
  //   this.getToken();
  //   console.log('orderID ==== ' + ordernumber);
  //   console.log('this.token.id ==== ' + this.token.id);

  //   return this.http.get(this.baseUrl + 'web_api/api/CustomerOrder/CheckStatusByOrderNumber', { params: {
  //     customerId: this.token.id,
  //     orderNumber: ordernumber
  //   },
  //   headers: {
  //       'ApiKey' : this.apiKey,
  //       'Authorization': 'Bearer ' + this.token.token
  //     }
  //   }).pipe(timeout(this.timeOut));
  // }

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
    return this.http.get(this.baseUrl + 'web_api/api/CustomerOrder/RemoveOrder', { params: {
      customerId: this.token.id
    },
    headers: {
        'ApiKey' : this.apiKey,
        'Authorization': 'Bearer ' + this.token.token
      }
    }).pipe(timeout(this.timeOut));
  }


  // test

  // UploadFileLogo() {
  //   let formData = new FormData();
  //   formData.append(file.name, file);
  //   return this.http.post<any>(this.baseUrl + 'api/Merchant/UploadFileLogo', formData);
  // }

  // customerPayment(order){
  //   this.getToken();
  //   // console.log(order);
  //   const textFormData = new FormData();
  //   textFormData.append(order.result, 'result');
  //   textFormData.append(order.customerId, 'customerId');
  //   textFormData.append(order.deliveryType, 'customerId');
  //   textFormData.append(order.deliveryId , 'deliveryId');
  //   textFormData.append(order.deliveryPrice, 'deliveryPrice');

  //   return this.http.post<any>(this.baseUrl + 'web_api/CustomerPayment', textFormData , { headers: {
  //       'ApiKey' : this.apiKey,
  //       'Authorization': 'Bearer ' + this.token.token
  //     }
  //   });
  // }


  checkErrorCode(code){
    switch (code) {
      case 'ORDER_001' : {
        return 'Order not found.';
      }
      case 'ORDER_002' : {
        return 'Some restaurants are temporary close';
      }
      case 'ORDER_003' : {
        return 'Some restaurants are close';
      }
      case 'ORDER_004' : {
        return 'Some menu are temporary out of order.';
      }
      case 'ORDER_015' : {
        return 'Order Number not found.';
      }
      case 'ITEM_002' : {
        return 'Some menu is out of order.';
      }
      case 'MERCHANT_003' : {
        return 'Some resterant is close';
      }
      default : {
        return 'unknown error';
      }
    }
  }
}
