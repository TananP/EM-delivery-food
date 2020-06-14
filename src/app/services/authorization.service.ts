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
  // token = JSON.parse(localStorage.getItem('token'));

  constructor(private http: HttpClient) {}

  getToken(code: string){
    localStorage.removeItem('token');
    // Production
    return this.http.get(this.baseUrl + 'web_api/api/Authentication/UserLogin', { params: {
        code
      }
    });

    // Develop
    // return this.http.get(this.baseUrl + 'web_api/api/Authentication/UserLogin' , { params: {
    //     code,
    //     callback: 'Y',
    //   },
    // });
  }

  checkAuthorization(){
    const token = localStorage.getItem('token');
    const profile = localStorage.getItem('userProfile');
    if (token) {
      const tokenJSON = JSON.parse(token);
      if (Date.now() > tokenJSON.expires) {
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

  getLineIdInfo(lineID, token){
    localStorage.removeItem('userProfile');
    return this.http.get(this.baseUrl + 'web_api/api/Customer/GetCustomerByLineId' , { params: {
      lineId: lineID
    }, headers: {
      'ApiKey' : this.apiKey,
      'Authorization': 'Bearer ' + token
      }
    });
  }
}
