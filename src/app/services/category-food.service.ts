import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryFoodService {
  baseUrl = environment.apiSysUrl;
  headers = new HttpHeaders().set('content-type', 'application/json');
  apiKey = '24D4f704-3883-4E3c-95dd-F08cb822eb82';
  token = JSON.parse(localStorage.getItem('token'));
  constructor(private http: HttpClient) { }

  getFoodCategory() {
    return this.http.get(this.baseUrl + 'web_api/api/MerchantCategory/GetCategoryFood', { headers: {
      'ApiKey' : this.apiKey,
      'Authorization': 'Bearer ' + this.token.token
      }
    });
  // return this.http.get(this.baseUrl + 'web_api/api/MerchantCategory/GetCategoryFood');
  }
}
