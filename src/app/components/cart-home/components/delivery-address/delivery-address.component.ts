import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CustomerAddressService } from 'src/app/services/customer-address.service';

@Component({
  selector: 'app-delivery-address',
  templateUrl: './delivery-address.component.html',
  styleUrls: ['./delivery-address.component.scss']
})
export class DeliveryAddressComponent implements OnInit {
  @Output() selectedAddress = new EventEmitter();
  // public latCenter: number;
  // public lngCenter: number;
  // public lat: number;
  // public lng: number;
  public addAddress = false;
  public deleteConfirmPopUp = false;
  public editAddress = false;

  public verifyName: boolean;
  public verifyPhoneNumber: boolean;
  public verifyAddress: boolean;
  private phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;

  public addressList: any;
  public editAddressList: any;
  public deleteAddressList: any;

  private id =  JSON.parse(localStorage.getItem('token'));
  private apiKeyTest = 'APIKeyTest';

  constructor(private customerAddressAPI: CustomerAddressService) {}

  ngOnInit(): void {
    // this.getPosition();
    this.customerAddressAPI.getCustomerAddressList(this.id.id , this.apiKeyTest, this.id.token).subscribe(x => {
      // console.log(x);
      this.addressList = x;
    });
  }

  // getPosition(): Promise<any>
  // {
  //   return new Promise((resolve, reject) => {
  //     // Get location lat lng
  //     navigator.geolocation.getCurrentPosition(resp => {
  //         resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
  //         this.latCenter = resp.coords.latitude;
  //         this.lngCenter = resp.coords.longitude;
  //         this.lat = this.latCenter;
  //         this.lng = this.lngCenter;
  //       },
  //       err => {
  //         reject(err);
  //       });
  //   });
  // }
  // setMarker(event){
  //   this.lat = event.latLng.lat();
  //   this.lng = event.latLng.lng();
  // }
  verify(name, phonNumber , address , comment , task: string){
      if (name !== ''){
        this.verifyName = true;
      } else {
        this.verifyName = false;
      }
      if (phonNumber.match(this.phoneno)){
        this.verifyPhoneNumber = true;
      } else {
        this.verifyPhoneNumber = false;
      }
      if (address !== ''){
        this.verifyAddress = true;
      } else {
        this.verifyAddress = false;
      }
      switch (task) {
        case 'add': {
          this.insertNewAddress(name, phonNumber , address , comment);
          break;
        }
        case 'edit': {
          this.editAddressConfirm(name, phonNumber , address , comment);
          break;
        }
      }
  }
  closePopUp(task){
    this.verifyName = null;
    this.verifyPhoneNumber = null;
    this.verifyAddress = null;
    switch (task) {
      case 'add': {
        this.addAddress = false;
        break;
      }
      case 'edit': {
        this.editAddress = false;
        break;
      }
    }
  }

  selectAddess(index){
    console.log('clicked address');
    this.selectedAddress.emit(index);
  }

  insertNewAddress(nameAddress, phonNumber , address , comment){
    if (this.verifyName && this.verifyPhoneNumber && this.verifyAddress) {
      const newAddressID = this.addressList.length;
      // tslint:disable-next-line: max-line-length
      const addressInfoList = {addressId: newAddressID, customerId: this.id.id, name: nameAddress, note: comment, detail: address, default: false};
      console.log(addressInfoList);
      this.customerAddressAPI.insertAddress(addressInfoList , this.apiKeyTest, this.id.token).subscribe( x => {
        console.log(x);
        this.addAddress = false;
        this.ngOnInit();
    });
  }
  }

  editAddressSelect(address){
    this.editAddressList = address;
    console.log(this.editAddressList);
    this.editAddress = true;
  }

  editAddressConfirm(nameAddress, phonNumber , address , comment){
    if (this.verifyName && this.verifyPhoneNumber && this.verifyAddress) {
      console.log('edit 2222');
      this.editAddressList.name = nameAddress;
      this.editAddressList.detail = address;
      this.editAddressList.note = comment;
      this.customerAddressAPI.updateAddress(this.editAddressList , this.apiKeyTest, this.id.token).subscribe( x => {
        console.log(x);
        this.editAddress = false;
        this.ngOnInit();
      });
    }
  }

  deleteAddress(address){
    this.deleteAddressList = address;
    this.deleteConfirmPopUp = true;
  }

  deleteConfirmation(confirm: boolean){
    if (confirm === true){
      console.log(this.deleteAddressList.addressId);
      this.customerAddressAPI.deleteAddress(this.deleteAddressList.addressId, this.apiKeyTest, this.id.token).subscribe( x => {
        this.deleteAddressList = {};
        this.deleteConfirmPopUp = false;
        this.ngOnInit();
      });
    }else{
      this.deleteAddressList = {};
      this.deleteConfirmPopUp = false;
    }
  }
}
