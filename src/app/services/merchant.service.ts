import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MerchantService {
  baseUrl = environment.apiSysUrl;
  headers = new HttpHeaders().set('content-type', 'application/json');
  apiKey = '24D4f704-3883-4E3c-95dd-F08cb822eb82';
  token = JSON.parse(localStorage.getItem('token'));

  constructor(private http: HttpClient) {}

  getMerchantList() {
    return this.http.get(this.baseUrl + 'web_api/api/Merchant/GetMerchantList');
  }

  getMerchantInfo(merchantName){
    return this.http.get(this.baseUrl + 'web_api/api/Merchant/GetMerchantList' , { params: {
      name: merchantName,
      // locationId: locationID,
      // floorId: floorID,
      // departmentId: departmentID
    },
      headers: {
        'ApiKey' : this.apiKey,
        'Authorization': 'Bearer ' + this.token.token
      }
    });
  }

  getFoodList(merchantID){
    return this.http.get(this.baseUrl + 'web_api/api/MerchantItem/GetItemFoodtList' , { params: {
      merchantId: merchantID
    },
      headers: {
        'ApiKey' : this.apiKey,
        'Authorization': 'Bearer ' + this.token.token
      }
    });
  }
  searchByRestaurantName(searchName) {
    return this.http.get(this.baseUrl + 'web_api/api/Merchant/GetMerchantList' , { params: {
      name: searchName
    },
      headers: {
        'ApiKey' : this.apiKey,
        'Authorization': 'Bearer ' + this.token.token
      }
    });
  }
  searchByCategoryID(categoryID) {
    return this.http.get(this.baseUrl + 'web_api/api/Merchant/GetMerchantList' , { params: {
      categoryId: categoryID
    },
      headers: {
        'ApiKey' : this.apiKey,
        'Authorization': 'Bearer ' + this.token.token
      }
    });
  }
  pickUp(){
    return this.http.get(this.baseUrl + 'web_api/api/MerchantCategory/GetCategoryPickup' , { headers: {
        'ApiKey' : this.apiKey,
        'Authorization': 'Bearer ' + this.token.token
      }
    });
  }
  getCoupon(customerID){
    return this.http.get(this.baseUrl + 'web_api/api/CustomerOrder/GetCouponByCustomerId' , { params: {
      customerId: customerID
    } , headers: {
      'ApiKey' : this.apiKey,
      'Authorization': 'Bearer ' + this.token.token
    }
    });
  }
  updateUsedCoupon(customerID , couponID){
    return this.http.get(this.baseUrl + 'web_api/api/MerchantCoupon/UpdateCouponUsed' , { params: {
      customerId: customerID,
      couponCode: couponID
    } , headers: {
      'ApiKey' : this.apiKey,
      'Authorization': 'Bearer ' + this.token.token
    }
    });
  }
  checkErrorCoupon(code){
    if (code === 'COUPON_001') {
      return 'Coupon not found.';
    }
    else if (code === 'COUPON_002') {
      return 'Coupon is out of order.';
    }
    else if (code === 'COUPON_003') {
      return 'Coupon expired.';
    }
    else if (code === 'COUPON_004') {
      return 'Coupon Code was used.';
    }
    else if (code === 'COUPON_005') {
      return 'Invalid Customer Id.';
    }
    else if (code === 'COUPON_006') {
      return 'Invalid Coupon Code.';
    }
    else {
      return 'Unknown error.';
     }
  }
}
