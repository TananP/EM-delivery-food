import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MerchantService {
  baseUrl = environment.apiSysUrl;
  headers = new HttpHeaders().set('content-type', 'application/json');

  constructor(private http: HttpClient) { }

  getMerchantList() {
    return this.http.get(this.baseUrl + 'web_api/api/Merchant/GetMerchantList');
  }
  searchByRestaurantName(searchName , apiKey, authorization) {
    return this.http.get(this.baseUrl + 'web_api/api/Merchant/GetMerchantList' , { params: {
      name: searchName
    },
      headers: {
        'ApiKey' : apiKey,
        'Authorization': 'Bearer ' + authorization
      }
    });
  }
  searchByCategoryID(categoryID , apiKey, authorization) {
    return this.http.get(this.baseUrl + 'web_api/api/Merchant/GetMerchantList' , { params: {
      categoryId: categoryID
    },
      headers: {
        'ApiKey' : apiKey,
        'Authorization': 'Bearer ' + authorization
      }
    });
  }
}
