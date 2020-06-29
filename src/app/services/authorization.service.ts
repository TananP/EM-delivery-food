import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  baseUrl = environment.apiSysUrl;
  headers = new HttpHeaders().set('content-type', 'application/json');
  // checkFirstTime = localStorage.getItem('firstTime');
  apiKey = '24D4f704-3883-4E3c-95dd-F08cb822eb82';
  private token: any;

  constructor(private http: HttpClient) {}
  getLocalToken(){
    this.token = JSON.parse(localStorage.getItem('token'));
  }
  getToken(code: string){
    this.getLocalToken();
    // this.http.get('/path/to/resource').subscribe((res: Response) => {
    //   console.log(res.headers);
    //   // you can assign the value to any variable here
    // });
    // localStorage.removeItem('token');

    // Production
    return this.http.get(this.baseUrl + 'web_api/api/Authentication/UserLogin' , { params: {
      code,
    }, headers: {
      'ApiKey' : this.apiKey
    }
    });

    // Develop
    // return this.http.get(this.baseUrl + 'web_api/api/Authentication/UserLogin' , { params: {
    //     code,
    //     callback: 'Y',
    //   }, headers: {
    //     'ApiKey' : this.apiKey
    //   }
    // });

  }

  checkAuthorization(){
    // const token = localStorage.getItem('token');
    // this.getLocalToken();
    const token = localStorage.getItem('token');
    const profile = localStorage.getItem('userProfile');
    if (token) {
      // const tokenJSON = JSON.parse(token);
      const decodeToken = jwt_decode(token);
      // console.log('Date.now() === ' + Date.now());
      // console.log('decodeToken.exp * 1000 === ' + decodeToken.exp * 1000);
      if (Date.now() > decodeToken.exp * 1000) {
        // redirect localhost
        // window.location.href = 'http://emfood.yipintsoi.com/web_api/api/Authentication/SigninLine?callback=Y';

        // redirect to production
        window.location.href = 'http://emfood.yipintsoi.com/web_api/api/Authentication/SigninLine';
      }
    }
    if (token === null || profile === null) {
        // redirect localhost
        // window.location.href = 'http://emfood.yipintsoi.com/web_api/api/Authentication/SigninLine?callback=Y';

        // redirect to production
        window.location.href = 'http://emfood.yipintsoi.com/web_api/api/Authentication/SigninLine';
    }
  }

  getLineIdInfo(customerId, token){
    localStorage.removeItem('userProfile');
    return this.http.get(this.baseUrl + 'web_api/api/Customer/GetCustomerById' , { params: {
      id: customerId
    }, headers: {
      'ApiKey' : this.apiKey,
      'Authorization': 'Bearer ' + token
      }
    });
  }

  updateLineIdInfo(customerName, phoneNumber){
    // const token = JSON.parse(localStorage.getItem('token'));
    this.getLocalToken();
    const updateData = {customerId: this.token.id , lineId: this.token.userName , fullName: customerName , mobileNumber: phoneNumber};
    return this.http.post(this.baseUrl + 'web_api/api/Customer/UpdateCustomer' , updateData , {
      headers: {
      'ApiKey' : this.apiKey,
      'Authorization': 'Bearer ' + this.token.token
      }
    });
  }
}
