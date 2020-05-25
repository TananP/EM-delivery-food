import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() taskData: string;
  @Input() searchPage: boolean;
  public cartPopUp: boolean;
  public historyPopUp: boolean;
  public orderPopUp: boolean;

  constructor() {}

  ngOnInit(): void {
    this.cartPopUp = false;
    this.historyPopUp = false;
    this.orderPopUp = false;
  }
  openMenu(trigger: boolean){
    if (trigger) {
      document.getElementById('sideMenu').style.width = '12.5rem';
    } else {
      document.getElementById('sideMenu').style.width = '0px';
    }
  }
  openPopUp(popName: string , trigger: boolean){
    switch (popName){
        case 'cart':
          this.cartPopUp = true;
          break;

        // case 'history':
        //   if (trigger){
        //     this.historyPopUp = true;
        //   }else{
        //     this.historyPopUp = false;
        //   }
        //   break;

        case 'order':
          if (trigger){
            this.orderPopUp = true;
          }else{
            this.orderPopUp = false;
          }
          break;
    }
  }
  receviveStatus(){
    this.cartPopUp = false;
  }
}
