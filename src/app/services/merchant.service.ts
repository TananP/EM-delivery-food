import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MerchantService {
  baseUrl = environment.apiSysUrl;
  headers = new HttpHeaders().set('content-type', 'application/json');
  apiKey = 'TestAPIKey';
  token = localStorage.getItem('token');

  constructor(private http: HttpClient) {}

  getMerchantList() {
    return this.http.get(this.baseUrl + 'web_api/api/Merchant/GetMerchantList');
  }

  getMerchantInfo(merchantName , locationID , floorID , departmentID){
    return this.http.get(this.baseUrl + 'web_api/api/Merchant/GetMerchantList' , { params: {
      name: merchantName,
      locationId: locationID,
      floorId: floorID,
      departmentId: departmentID
    },
      headers: {
        'ApiKey' : this.apiKey,
        'Authorization': 'Bearer ' + this.token
      }
    });
  }

  getFoodList(merchantID){
    return this.http.get(this.baseUrl + 'web_api/api/MerchantItem/GetItemFoodtList' , { params: {
      merchantId: merchantID
    },
      headers: {
        'ApiKey' : this.apiKey,
        'Authorization': 'Bearer ' + this.token
      }
    });
  }
  searchByRestaurantName(searchName) {
    return this.http.get(this.baseUrl + 'web_api/api/Merchant/GetMerchantList' , { params: {
      name: searchName
    },
      headers: {
        'ApiKey' : this.apiKey,
        'Authorization': 'Bearer ' + this.token
      }
    });
  }
  searchByCategoryID(categoryID) {
    return this.http.get(this.baseUrl + 'web_api/api/Merchant/GetMerchantList' , { params: {
      categoryId: categoryID
    },
      headers: {
        'ApiKey' : this.apiKey,
        'Authorization': 'Bearer ' + this.token
      }
    });
  }
  pickUp(){
    return this.http.get(this.baseUrl + 'web_api/api/MerchantCategory/GetCategoryPickup' , { headers: {
        'ApiKey' : this.apiKey,
        'Authorization': 'Bearer ' + this.token
      }
    });
  }
  getCoupon(customerID){
    return this.http.get(this.baseUrl + 'web_api/api/CustomerOrder/GetCouponByCustomerId' , { params: {
      customerId: customerID
    } , headers: {
      'ApiKey' : this.apiKey,
      'Authorization': 'Bearer ' + this.token
    }
    });
  }
  updateUsedCoupon(customerID , couponID){
    return this.http.get(this.baseUrl + 'web_api/api/MerchantCoupon/UpdateCouponUsed' , { params: {
      customerId: customerID,
      couponCode: couponID
    } , headers: {
      'ApiKey' : this.apiKey,
      'Authorization': 'Bearer ' + this.token
    }
    });
  }
  checkErrorCoupon(code){
    if (code === 'COUPON_001') {
      return 'Coupon not found.';
    }
    if (code === 'COUPON_002') {
      return 'Coupon is out of order.';
    }
    if (code === 'COUPON_003') {
      return 'Coupon expired.';
    }
    if (code === 'COUPON_004') {
      return 'Coupon Code was used.';
    }
    if (code === 'COUPON_005') {
      return 'Invalid Customer Id.';
    }
    if (code === 'COUPON_006') {
      return 'Invalid Coupon Code.';
    }
  }
}
