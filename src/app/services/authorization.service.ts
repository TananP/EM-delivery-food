import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NonNullAssert } from '@angular/compiler';

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
    // this.http.get('/path/to/resource').subscribe((res: Response) => {
    //   console.log(res.headers);
    //   // you can assign the value to any variable here
    // });
    // localStorage.removeItem('token');

    // Production
    // return this.http.get(this.baseUrl + 'web_api/api/Authentication/UserLogin', { params: {
    //     code
    //   }
    // });

    // Develop
    return this.http.get(this.baseUrl + 'web_api/api/Authentication/UserLogin' , { params: {
        code,
        callback: 'Y',
      }
    });

  }

  checkAuthorization(){
    // const token = localStorage.getItem('token');
    this.getLocalToken();
    const profile = localStorage.getItem('userProfile');

    if (this.token) {
      // const tokenJSON = JSON.parse(token);
      if (Date.now() > this.token.expires) {
        // redirect localhost
        // window.location.href = 'http://emfood.yipintsoi.com/web_api/api/Authentication/SigninLine?callback=Y';

        // redirect to production
        window.location.href = 'http://emfood.yipintsoi.com/web_api/api/Authentication/SigninLine';
      }
    }
    if (this.token === null || profile === null) {
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
