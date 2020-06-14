import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CustomerAddressService } from 'src/app/services/customer-address.service';

@Component({
  selector: 'app-delivery-address',
  templateUrl: './delivery-address.component.html',
  styleUrls: ['./delivery-address.component.scss']
})
export class DeliveryAddressComponent implements OnInit {
  @Output() selectedAddress = new EventEmitter();
  public latCenter: number;
  public lngCenter: number;
  public lat: number;
  public lng: number;
  public addAddress = false;
  public deleteConfirmPopUp = false;
  public editAddress = false;
  public openErrorPopUp = false;
  public errorMessage = '';
  // Test
  public activeIndex = null;
  //
  // public verifyPhoneNumber: boolean;
  // private phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
  public verifyName: boolean;
  public verifyLatLng: boolean;
  public verifyAddress: boolean;
  public verifyAll: boolean;
  public setAddressDefault: boolean;

  public addressList: any;
  public editAddressList: any;
  public deleteAddressList: any;

  // private token =  JSON.parse(localStorage.getItem('token'));

  constructor(private customerAddressAPI: CustomerAddressService) {
    this.getPosition();
  }

  ngOnInit(): void {
    // this.getPosition();
    this.customerAddressAPI.getCustomerAddressList().subscribe(x => {
      this.addressList = x;
      console.log(this.addressList);
    });
  }

  getPosition(): Promise<any>
  {
    // return new Promise((resolve, reject) => {
    return new Promise((reject) => {
      // Get location lat lng
      navigator.geolocation.getCurrentPosition(resp => {
          // resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
          // console.log(resp.coords.longitude);
          this.latCenter = resp.coords.latitude;
          this.lngCenter = resp.coords.longitude;
          // console.log('lng === ' + this.lngCenter + 'lat ===' + this.latCenter);
          this.lat = this.latCenter;
          this.lng = this.lngCenter;
        },
        err => {
          this.latCenter = 13.7319703;
          this.lngCenter = 100.5696853;
          this.lat = this.latCenter;
          this.lng = this.lngCenter;
          // reject(err);
        });
    });
  }

  setMarker(event){
    this.lat = event.latLng.lat();
    this.lng = event.latLng.lng();
    // console.log('lat === ' + this.lat);
    console.log('lng === ' + this.lng);
  }

  verify(name, address , comment , task: string){
      // if (phonNumber.match(this.phoneno)){
      //   this.verifyPhoneNumber = true;
      // } else {
      //   this.verifyPhoneNumber = false;
      // }
      if ( this.lat >= 13.729230290372476 && this.lat <= 13.732993677771026){
        this.verifyLatLng = false;
      }else {
        this.verifyLatLng = true;
      }
      if ( this.lng >= 100.56892861296625 && this.lng <= 100.57006533230138){
        this.verifyLatLng = false;
      } else {
        this.verifyLatLng = true;
      }
      if (name !== ''){
        this.verifyName = true;
      } else {
        this.verifyName = false;
      }
      if (address !== ''){
        this.verifyAddress = true;
      } else {
        this.verifyAddress = false;
      }
      if (!this.verifyName || !this.verifyLatLng || !this.verifyAddress) {
        this.verifyAll = false;
      } else {
        this.verifyAll = true;
      }
      switch (task) {
        case 'add': {
          this.insertNewAddress(name , address , comment);
          break;
        }
        case 'edit': {
          this.editAddressConfirm(name , address , comment);
          break;
        }
      }
  }
  closePopUp(task){
    this.verifyName = null;
    // this.verifyPhoneNumber = null;
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
    this.activeIndex = index;
    // console.log(this.activeIndex);
    // this.selectedAddress.emit(index);
  }
  confirmSelectAddess(){
    if (this.activeIndex !== null) {
      const address = [];
      this.customerAddressAPI.customerAddressCheck(this.activeIndex.addressId).subscribe( x => {
        this.activeIndex = x;
        address.push({addressId: this.activeIndex.addressId , deliveryPrice: this.activeIndex.deliveryPrice ,
          customerId: this.activeIndex.customerId, name: this.activeIndex.name,
          detail: this.activeIndex.detail, note: this.activeIndex.note , type: 'delivery'});
        this.selectedAddress.emit(address);
      }, error => {
        const result = this.customerAddressAPI.checkErrorCode(error.error.code);
        this.errorMessage = result;
        this.openErrorPopUp = true;
      });
    }
  }
  addAddressPopUp(){
    this.addAddress = true;
    this.getPosition();
  }

  insertNewAddress(nameAddress , address , comment){
    if (this.verifyAll) {
      // console.log(this.addressList);
      const token =  JSON.parse(localStorage.getItem('token'));
      if (this.addressList === undefined){
        this.errorMessage = 'Could not add new addres please try again later';
        this.openErrorPopUp = true;
      }else{
        if (this.addressList.length === 0){
          this.setAddressDefault = true;
        }else{
          this.setAddressDefault = false;
        }
        const addressInfoList = {customerId: token.id
          , name: nameAddress, note: comment, detail: address, default: this.setAddressDefault
          , mapLatitude: this.lat , mapLongitude: this.lng};

        this.customerAddressAPI.insertAddress(addressInfoList).subscribe( x => {
          this.addAddress = false;
          this.ngOnInit();
        }, error => {
          const result = this.customerAddressAPI.checkErrorCode(error.error.code);
          // console.log(result);
          this.errorMessage = result;
          this.openErrorPopUp = true;
        });
      }
    }
  }
  setDefaultAddress(address){
    this.customerAddressAPI.setDefault(address.customerId , address.addressId).subscribe( x => {
      this.ngOnInit();
    });
  }

  editAddressSelect(address){
    this.editAddressList = address;
    this.editAddress = true;
    this.lat = address.mapLatitude;
    this.lng = address.mapLongitude;
  }

  editAddressConfirm(nameAddress , address , comment){
    if (this.verifyAll) {
      this.editAddressList.name = nameAddress;
      this.editAddressList.detail = address;
      this.editAddressList.note = comment;
      this.editAddressList.mapLatitude = this.lat;
      this.editAddressList.mapLongitude = this.lng;
      this.customerAddressAPI.updateAddress(this.editAddressList).subscribe( x => {
        this.editAddress = false;
        this.ngOnInit();
      }, error => {
        const result = this.customerAddressAPI.checkErrorCode(error.error.code);
        // console.log(result);
        this.errorMessage = result;
        this.openErrorPopUp = true;
      });
    }
  }

  deleteAddress(address){
    this.deleteAddressList = address;
    this.deleteConfirmPopUp = true;
  }

  deleteConfirmation(confirm: boolean){
    if (confirm === true){
      this.customerAddressAPI.deleteAddress(this.deleteAddressList.addressId).subscribe( x => {
        this.deleteAddressList = {};
        this.deleteConfirmPopUp = false;
        this.ngOnInit();
      }, error => {
        const result = this.customerAddressAPI.checkErrorCode(error.error.code);
        // console.log(result);
        this.errorMessage = result;
        this.openErrorPopUp = true;
      });
    }else{
      this.deleteAddressList = {};
      this.deleteConfirmPopUp = false;
    }
  }
}
