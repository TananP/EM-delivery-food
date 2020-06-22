import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
@Input() orderPopUp: boolean;
@Output() closePopUp = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  closeOrderPage(){
    this.closePopUp.emit();
  }
}
