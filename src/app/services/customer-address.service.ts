import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerAddressService {
  baseUrl = environment.apiSysUrl;
  headers = new HttpHeaders().set('content-type', 'application/json');
  apiKey = 'TestAPIKey';
  token = localStorage.getItem('token');

  constructor(private http: HttpClient) {}

  // getCustomAddress(id) {
  //   const token = this.token;
  //   return this.http.get(this.baseUrl + 'web_api/api/CustomerAddress/GetCustomerAddress', { params: {
  //     id,
  //     token
  //   }
  //   });
  // }

  customerAddressCheck(addressId){
    return this.http.get(this.baseUrl + 'web_api/api/CustomerAddress/GetCustomerAddressById', { params: {
        id: addressId,
        checkDistance: 'true',
        checkPrice: 'true'
      },
      headers: {
        'ApiKey' : this.apiKey,
        'Authorization': 'Bearer ' + this.token
      }
    });
  }

  getCustomerAddressList(customerId){
    return this.http.get(this.baseUrl + 'web_api/api/CustomerAddress/GetCustomerAddressByCustomerId', { params: {
        id: customerId
      },
      headers: {
        'ApiKey' : this.apiKey,
        'Authorization': 'Bearer ' + this.token
      }
    });
  }

  getCustomerByLineId(id){
    return this.http.get(this.baseUrl + 'web_api/api/Customer/GetCustomerByLineId', { params: {
      lineId: id
      },
      headers: {
        'ApiKey' : this.apiKey,
        'Authorization': 'Bearer ' + this.token
      }
    });
  }

  insertAddress(addNewAddress){
    return this.http.post(this.baseUrl + 'web_api/api/CustomerAddress/InsertCustomerAddress', addNewAddress, {
      headers: {
        'ApiKey' : this.apiKey,
        'Authorization': 'Bearer ' + this.token
      }
    });
  }

  deleteAddress(idAddress){
    return this.http.get(this.baseUrl + 'web_api/api/CustomerAddress/DeleteCustomerAddress', {params: {
      AddressId: idAddress
      },
      headers: {
        'ApiKey' : this.apiKey,
        'Authorization': 'Bearer ' + this.token
      }
    });
  }

  updateAddress(editAddress){
    return this.http.post(this.baseUrl + 'web_api/api/CustomerAddress/UpdateCustomerAddress', editAddress, {
      headers: {
        'ApiKey' : this.apiKey,
        'Authorization': 'Bearer ' + this.token
      }
    });
  }

  setDefault(customerID, addressID){
    return this.http.get(this.baseUrl + 'web_api/api/CustomerAddress/UpdateDefaultCustomerAddress', {params: {
      customerId: customerID,
      AddressIdDefault: addressID
      },
      headers: {
        'ApiKey' : this.apiKey,
        'Authorization': 'Bearer ' + this.token
      }
    });
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
