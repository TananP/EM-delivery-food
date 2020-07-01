import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TestService {
  baseUrl = environment.apiSysUrl;
  headers = new HttpHeaders().set('content-type', 'application/json');
  apiKey = '24D4f704-3883-4E3c-95dd-F08cb822eb82';
  constructor(private http: HttpClient) {}

  lineLogIn(){
    const token = JSON.parse(localStorage.getItem('token'));
    return this.http.post(this.baseUrl + 'web_api/api/Authentication/SigninLine', { params: {
      callback: 'Y',
    }, headers: {
        'ApiKey' : this.apiKey,
        'Authorization': 'Bearer ' + token.token
      }
    });
  }

  test2c2p(order){
    const token = JSON.parse(localStorage.getItem('token'));
    return this.http.post(this.baseUrl + 'web_api/CustomerPayment', order, { headers: {
        'ApiKey' : this.apiKey,
        'Authorization': 'Bearer ' + token.token
      }
    });
  }

  redirectWithPost(url, obj) {
    const mapForm = document.createElement('form');
    // mapForm.target = '_blank';
    mapForm.target = '_self';
    // mapForm.enctype = 'multipart/mixed';
    mapForm.method = 'POST'; // or "post" if appropriate
    mapForm.action = url;
    Object.keys(obj).forEach(param => {
      const mapInput = document.createElement('input');
      mapInput.type = 'hidden';
      mapInput.name = param;
      mapInput.setAttribute('value', obj[param]);
      mapForm.appendChild(mapInput);
  });
    // document.head.appendChild(testHeader);
    document.body.appendChild(mapForm);
    // console.log(mapForm);
    // debugger;
    mapForm.submit();
  }
}
