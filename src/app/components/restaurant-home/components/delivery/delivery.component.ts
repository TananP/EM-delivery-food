import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MerchantService } from 'src/app/services/merchant.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit {
  public merchantId = this.route.snapshot.paramMap.get('merchantId');
  public menuSelected = {name: '', description: '', price: 0};
  public totalPrice = 0;

  public menuList: any;
  public openPopUp: boolean;
  public numberEachDish: number;
  public openCartPopUp: boolean;

  constructor( private route: ActivatedRoute , private merchantService: MerchantService) { }

  ngOnInit(): void {
    this.openPopUp = false;
    this.openCartPopUp = false;
    this.numberEachDish = 1;
    this.menuList = [];
    this.merchantService.getFoodList(this.merchantId).subscribe(x => {
      this.menuList = x;
      console.log(this.menuList.data);
    });
  }
  popUp(menuName: string , menuDescription: string , menuPrice: number){
    this.openPopUp = true;
    this.menuSelected = {name: '', description: '', price: 0};
    this.menuSelected = {name: menuName, description: menuDescription, price: menuPrice};
    this.totalPrice = this.menuSelected.price;
    console.log(this.menuSelected);
  }
  closePopUp(){
    this.openPopUp = false;
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
}
