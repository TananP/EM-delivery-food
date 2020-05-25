import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerAddressService {
  baseUrl = environment.apiSysUrl;

  constructor(private http: HttpClient) { }

  getCustomAddress(id, authorization) {
    return this.http.get(this.baseUrl + 'web_api/api/CustomerAddress/GetCustomerAddress', { params: {
      id,
      authorization
    }
    });
  }
  getCustomerAddressList(customerId, apiKey , authorization){
    return this.http.get(this.baseUrl + 'web_api/api/CustomerAddress/GetCustomerAddressByCustomerId', { params: {
        id: customerId
      },
      headers: {
        'ApiKey' : apiKey,
        'Authorization': 'Bearer ' + authorization
      }
    });
  }
  testGetAPI(id, apiKey , authorization){
    return this.http.get(this.baseUrl + 'web_api/api/Customer/GetCustomerByLineId', { params: {
      lineId: id
      },
      headers: {
        'ApiKey' : apiKey,
        'Authorization': 'Bearer ' + authorization
      }
    });
  }

  insertAddress(addNewAddress , apiKey , authorization){
    return this.http.post(this.baseUrl + 'web_api/api/CustomerAddress/InsertCustomerAddress', addNewAddress, {
      headers: {
        'ApiKey' : apiKey,
        'Authorization': 'Bearer ' + authorization
      }
    });
  }

  deleteAddress(idAddress , apiKey , authorization){
    return this.http.get(this.baseUrl + 'web_api/api/CustomerAddress/DeleteCustomerAddress', {params: {
      AddressId: idAddress
      },
      headers: {
        'ApiKey' : apiKey,
        'Authorization': 'Bearer ' + authorization
      }
    });
  }

  updateAddress(editAddress , apiKey , authorization){
    return this.http.post(this.baseUrl + 'web_api/api/CustomerAddress/UpdateCustomerAddress', editAddress, {
      headers: {
        'ApiKey' : apiKey,
        'Authorization': 'Bearer ' + authorization
      }
    });
  }
}
