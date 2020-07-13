import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MerchantService {
  baseUrl = environment.apiSysUrl;
  apiKey = environment.apiKey;
  headers = new HttpHeaders().set('content-type', 'application/json');
  // apiKey = '24D4f704-3883-4E3c-95dd-F08cb822eb82';
  private token: any;
  timeOut = 10000;

  constructor(private http: HttpClient) {}

  getToken(){
    this.token = JSON.parse(localStorage.getItem('token'));
  }

  getMerchantList() {
    this.getToken();
    return this.http.get(this.baseUrl + 'web_api/api/Merchant/GetMerchantList', { headers: {
      'ApiKey' : this.apiKey,
      'Authorization': 'Bearer ' + this.token.token
      }
    }).pipe(timeout(this.timeOut));
  }

  getMerchantInfo(merchantName){
    this.getToken();
    return this.http.get(this.baseUrl + 'web_api/api/Merchant/GetMerchantList' , { params: {
      name: merchantName
    },
      headers: {
        'ApiKey' : this.apiKey,
        'Authorization': 'Bearer ' + this.token.token
      }
    }).pipe(timeout(this.timeOut));
  }

  getCategoryPickUp() {
    this.getToken();
    return this.http.get(this.baseUrl + 'web_api/api/MerchantCategory/GetCategoryPickup', { headers: {
      'ApiKey' : this.apiKey,
      'Authorization': 'Bearer ' + this.token.token
      }
    }).pipe(timeout(this.timeOut));
  }

  getFoodList(merchantID){
    this.getToken();
    return this.http.get(this.baseUrl + 'web_api/api/MerchantItem/GetItemFoodtList' , { params: {
      merchantId: merchantID
    },
      headers: {
        'ApiKey' : this.apiKey,
        'Authorization': 'Bearer ' + this.token.token
      }
    }).pipe(timeout(this.timeOut));
  }

  searchByRestaurantName(searchName) {
    this.getToken();
    return this.http.get(this.baseUrl + 'web_api/api/Merchant/GetMerchantList' , { params: {
      name: searchName
    },
      headers: {
        'ApiKey' : this.apiKey,
        'Authorization': 'Bearer ' + this.token.token
      }
    }).pipe(timeout(this.timeOut));
  }

  searchByCategoryID(categoryID) {
    this.getToken();
    return this.http.get(this.baseUrl + 'web_api/api/Merchant/GetMerchantList' , { params: {
      categoryId: categoryID
    },
      headers: {
        'ApiKey' : this.apiKey,
        'Authorization': 'Bearer ' + this.token.token
      }
    }).pipe(timeout(this.timeOut));
  }

  // pickUp(){
  //   this.getToken();
  //   return this.http.get(this.baseUrl + 'web_api/api/MerchantCategory/GetCategoryPickup' , { headers: {
  //       'ApiKey' : this.apiKey,
  //       'Authorization': 'Bearer ' + this.token.token
  //     }
  //   });
  // }

  // getCoupon(customerID){
  //   this.getToken();
  //   return this.http.get(this.baseUrl + 'web_api/api/CustomerOrder/GetCouponByCustomerId' , { params: {
  //     customerId: customerID
  //   } , headers: {
  //     'ApiKey' : this.apiKey,
  //     'Authorization': 'Bearer ' + this.token.token
  //   }
  //   });
  // }

  updateUsedCoupon(couponID){
    this.getToken();
    return this.http.get(this.baseUrl + 'web_api/api/MerchantCoupon/UpdateCouponUsed' , { params: {
      customerId: this.token.id,
      couponCode: couponID
    } , headers: {
      'ApiKey' : this.apiKey,
      'Authorization': 'Bearer ' + this.token.token
    }
    }).pipe(timeout(this.timeOut));
  }

  cancelCoupon(couponID){
    this.getToken();
    return this.http.get(this.baseUrl + 'web_api/api/MerchantCoupon/DeleteCouponUsed' , { params: {
      customerId: this.token.id,
      couponCode: couponID
    } , headers: {
      'ApiKey' : this.apiKey,
      'Authorization': 'Bearer ' + this.token.token
    }
    }).pipe(timeout(this.timeOut));
  }

  checkErrorCoupon(code){
    switch (code) {
      case 'ORDER_001' : {
        return 'Order not found.';
      }
      case 'COUPON_001' : {
        return 'Coupon not found.';
      }
      case 'COUPON_002' : {
        return 'Coupon is out of order.';
      }
      case 'COUPON_003' : {
        return 'Coupon expired.';
      }
      case 'COUPON_004' : {
        return 'Coupon Code was used.';
      }
      case 'COUPON_006' : {
        return 'Invalid Coupon Code.';
      }
      default : {
        return 'Error please try again later.';
      }
    }
  }
}
