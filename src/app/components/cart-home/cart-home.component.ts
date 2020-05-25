import { Component, OnInit, Input, Output , EventEmitter } from '@angular/core';
// import { CustomerAddressService } from 'src/app/services/customer-address.service';

@Component({
  selector: 'app-cart-home',
  templateUrl: './cart-home.component.html',
  styleUrls: ['./cart-home.component.scss']
})
export class CartHomeComponent implements OnInit {
  @Input() cartPopUp: boolean;
  @Output() popUpStatus = new EventEmitter();
  public deliveryAddress = false;
  public pickUp = false;
  public selectedAddress: any;
  public showName: boolean;

  // private id =  JSON.parse(localStorage.getItem('token'));
  // private apiKeyTest = 'APIKeyTest';
  constructor() {}

  ngOnInit(): void {
    // this.customerAddressAPI.getCustomerAddressList(this.id.id , this.apiKeyTest, this.id.token).subscribe(x => {
    //   console.log(x);
    //   // this.addressList = x;
    // });
  }

  openPickUpPopUp(){
    this.pickUp = true;
    this.showName = false;
  }
  openAddressPopUp(){
    this.deliveryAddress = true;
  }
  closeCartPage(){
    this.cartPopUp = false;
    this.popUpStatus.emit('55555');
  }
  closeAddress(){
    this.cartPopUp = true;
    this.deliveryAddress = false;
  }
  addressSelected(event){
    this.selectedAddress = event;
    this.showName = true;
    this.pickUp = false;
    this.closeAddress();
  }
}
