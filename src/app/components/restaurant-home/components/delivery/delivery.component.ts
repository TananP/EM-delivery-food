import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit {
  public recommendList: Array<number>;
  public menuList: Array<number>;
  public openPopUp: boolean;
  public menuName: string;
  public numberEachDish: number;
  public openCartPopUp: boolean;

  constructor( private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.openPopUp = false;
    this.openCartPopUp = false;
    this.numberEachDish = 1;
    this.recommendList = [1, 2, 3, 4, 5];
    this.menuList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  }
  popUp(menu: string){
    this.openPopUp = true;
    this.menuName = menu;
  }
  closePopUp(){
    this.openPopUp = false;
    this.menuName = '';
    this.numberEachDish = 1;
  }
  changeDishNumber(order: string){
    if (order === 'add'){
      this.numberEachDish += 1;
    }
    if (order === 'minus') {
      if (this.numberEachDish === 1){
        this.numberEachDish = 1 ;
      }else{
        this.numberEachDish -= 1;
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
