import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerAddressService {
  baseUrl = environment.apiSysUrl;
  headers = new HttpHeaders().set('content-type', 'application/json');
  apiKey = '24D4f704-3883-4E3c-95dd-F08cb822eb82';
  private token: any;
  timeOut = 10000;

  constructor(private http: HttpClient) {}

  // getCustomAddress(id) {
  //   const token = this.token;
  //   return this.http.get(this.baseUrl + 'web_api/api/CustomerAddress/GetCustomerAddress', { params: {
  //     id,
  //     token
  //   }
  //   });
  // }
  getToken(){
    this.token = JSON.parse(localStorage.getItem('token'));
  }

  customerAddressCheck(addressId){
    this.getToken();
    return this.http.get(this.baseUrl + 'web_api/api/CustomerAddress/GetCustomerAddressById', { params: {
        id: addressId,
        checkDistance: 'true',
        checkPrice: 'true'
      },
      headers: {
        'ApiKey' : this.apiKey,
        'Authorization': 'Bearer ' + this.token.token
      }
    }).pipe(timeout(this.timeOut));
  }

  getCustomerAddressList(){
    this.getToken();
    return this.http.get(this.baseUrl + 'web_api/api/CustomerAddress/GetCustomerAddressByCustomerId', { params: {
        id: this.token.id
      },
      headers: {
        'ApiKey' : this.apiKey,
        'Authorization': 'Bearer ' + this.token.token
      }
    }).pipe(timeout(this.timeOut));
  }

  // getCustomerByLineId(id){
  //   this.getToken();
  //   return this.http.get(this.baseUrl + 'web_api/api/Customer/GetCustomerByLineId', { params: {
  //     lineId: id
  //     },
  //     headers: {
  //       'ApiKey' : this.apiKey,
  //       'Authorization': 'Bearer ' + this.token.token
  //     }
  //   });
  // }

  insertAddress(addNewAddress){
    this.getToken();
    return this.http.post(this.baseUrl + 'web_api/api/CustomerAddress/InsertCustomerAddress', addNewAddress, {
      headers: {
        'ApiKey' : this.apiKey,
        'Authorization': 'Bearer ' + this.token.token
      }
    }).pipe(timeout(this.timeOut));
  }

  deleteAddress(idAddress){
    this.getToken();
    return this.http.get(this.baseUrl + 'web_api/api/CustomerAddress/DeleteCustomerAddress', {params: {
      AddressId: idAddress
      },
      headers: {
        'ApiKey' : this.apiKey,
        'Authorization': 'Bearer ' + this.token.token
      }
    }).pipe(timeout(this.timeOut));
  }

  updateAddress(editAddress){
    this.getToken();
    return this.http.post(this.baseUrl + 'web_api/api/CustomerAddress/UpdateCustomerAddress', editAddress, {
      headers: {
        'ApiKey' : this.apiKey,
        'Authorization': 'Bearer ' + this.token.token
      }
    }).pipe(timeout(this.timeOut));
  }

  setDefault(customerID, addressID){
    this.getToken();
    return this.http.get(this.baseUrl + 'web_api/api/CustomerAddress/UpdateDefaultCustomerAddress', {params: {
      customerId: customerID,
      AddressIdDefault: addressID
      },
      headers: {
        'ApiKey' : this.apiKey,
        'Authorization': 'Bearer ' + this.token.token
      }
    }).pipe(timeout(this.timeOut));
  }

  checkErrorCode(code){
    if (code === 'ADDRESS_001') {
      return 'Invalid Latitude.';
    }
    else if (code === 'ADDRESS_002') {
      return 'Invalid Longitude.';
    }
    else if (code === 'ADDRESS_003') {
      return 'Location is out of area.';
    }
    else {
      return 'Unknown error.';
    }
  }
}
