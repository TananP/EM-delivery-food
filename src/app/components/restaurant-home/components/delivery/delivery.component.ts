import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MerchantService } from 'src/app/services/merchant.service';
import { CustomerOrderService } from 'src/app/services/customer-order.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit {
  // Test
  // public floorId = this.route.snapshot.paramMap.get('floorId');
  // public departmentId = this.route.snapshot.paramMap.get('departmentId');
  // public locationId = this.route.snapshot.paramMap.get('locationId');
  // public searchName = this.route.snapshot.paramMap.get('searchName');
  public restaurantInfo: any;
  // =====
  public merchantId = this.route.snapshot.paramMap.get('merchantId');
  public menuSelected: any;
  public totalPrice = 0;
  public token = JSON.parse(localStorage.getItem('token'));

  public menuList: any;
  public openPopUp: boolean;
  public numberEachDish: number;
  public openCartPopUp: boolean;

  // tslint:disable-next-line: max-line-length
  constructor( private route: ActivatedRoute , private merchantService: MerchantService, private customerOrderService: CustomerOrderService) { }

  ngOnInit(): void {
    this.openPopUp = false;
    this.openCartPopUp = false;
    this.numberEachDish = 1;
    this.menuList = [];
    this.restaurantInfo = [];
    this.merchantService.getFoodList(this.merchantId).subscribe(x => {
      this.menuList = x;
      // console.log(x);
    });
  }
  // popUp(itemId: number , menuName: string , menuDescription: string , menuPrice: number){
    // this.menuSelected = {itemID: null , name: '', description: '', price: 0};
    // this.menuSelected = {itemID: itemId, name: menuName, description: menuDescription, price: menuPrice};
  popUp(menu){
    this.openPopUp = true;
    this.menuSelected = menu;
    // console.log(this.menuSelected);
    this.totalPrice = this.menuSelected.price;
  }
  closePopUp(){
    this.openPopUp = false;
    this.menuSelected = {};
    this.numberEachDish = 1;
  }
  changeDishNumber(order: string){
    if (order === 'add'){
      this.numberEachDish += 1;
      this.totalPrice = this.menuSelected.price * this.numberEachDish;
    }
    if (order === 'minus') {
      if (this.numberEachDish === 1){
        this.numberEachDish = 1 ;
      }else{
        this.numberEachDish -= 1;
        this.totalPrice = this.menuSelected.price * this.numberEachDish;
      }
    }
  }

  openCart(trigger: boolean){
    if (trigger){
      this.openCartPopUp = true;
    }else{
      this.openCartPopUp = false;
    }
  }

  addToCart(comment){
    const customerOrder = {customerId: this.token.id, merchantId: this.merchantId,
      itemId: this.menuSelected.itemId, amount: this.numberEachDish , note: comment};
    console.log(customerOrder);
    this.customerOrderService.addOrder(customerOrder).subscribe( x => {
      console.log(x);
      this.closePopUp();
    });
  }
}
