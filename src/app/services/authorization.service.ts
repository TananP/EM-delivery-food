import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  baseUrl = environment.apiSysUrl;
  headers = new HttpHeaders().set('content-type', 'application/json');
  // checkFirstTime = localStorage.getItem('firstTime');

  constructor(private http: HttpClient) {}

  getToken(code: string){
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
    const token = localStorage.getItem('token');
    if (token) {
      const tokenJSON = JSON.parse(token);
      if (Date.now() > tokenJSON.expires) {
        // redirect localhost
        window.location.href = 'http://emfood.yipintsoi.com/web_api/api/Authentication/SigninLine?callback=Y';

        // redirect to production
        // window.location.href = 'http://emfood.yipintsoi.com/web_api/api/Authentication/SigninLine';
      }
    }
    if (token === null) {
        // redirect localhost
        window.location.href = 'http://emfood.yipintsoi.com/web_api/api/Authentication/SigninLine?callback=Y';

        // redirect to production
        // window.location.href = 'http://emfood.yipintsoi.com/web_api/api/Authentication/SigninLine';
    }
  }
}
