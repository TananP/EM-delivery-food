import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryMerchantService {
  baseUrl = environment.apiSysUrl;
  headers = new HttpHeaders().set('content-type', 'application/json');
  apiKey = '24D4f704-3883-4E3c-95dd-F08cb822eb82';
  // apiKey = '84Ec7f19-Ac93-46d6-b3d6-2C118be6533d';
  token = JSON.parse(localStorage.getItem('token'));
  timeOut = 10000;

  constructor(private http: HttpClient) { }

  getMerchantCategory() {
    return this.http.get(this.baseUrl + 'web_api/api/MerchantCategory/GetCategoryMerchant' , { headers: {
      'ApiKey' : this.apiKey,
      'Authorization': 'Bearer ' + this.token.token
      }
    }).pipe(timeout(this.timeOut));
  }
}
