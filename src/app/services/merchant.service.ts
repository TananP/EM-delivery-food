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

  constructor(private http: HttpClient) {
    if (this.token === null) {
      window.location.href = 'http://emfood.yipintsoi.com/web_api/api/Authentication/SigninLine';
    }
  }

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
}
