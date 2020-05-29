import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  baseUrl = environment.apiSysUrl;
  headers = new HttpHeaders().set('content-type', 'application/json');
  token = localStorage.getItem('token');
  // checkFirstTime = localStorage.getItem('firstTime');

  constructor(private http: HttpClient) {}

  getToken(code: string){
    return this.http.get(this.baseUrl + 'web_api/api/Authentication/UserLogin', { params: {
        code
      }
    });
  }

  checkAuthorization(){
    if (this.token) {
      const tokenJSON = JSON.parse(this.token);
      if (Date.now() > tokenJSON.expires * 1000) {
        window.location.href = 'http://emfood.yipintsoi.com/web_api/api/Authentication/SigninLine';
      }
    }
  }
}
