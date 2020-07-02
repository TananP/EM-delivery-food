import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { CustomerOrderService } from 'src/app/services/customer-order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
@Input() orderPopUp: boolean;
@Output() closePopUp = new EventEmitter();
  constructor(private customerOrderService: CustomerOrderService) { }

  ngOnInit(): void {
    this.customerOrderService.getCurrentOrder().subscribe( x => {
      console.log(x);
    }, error => {
      console.log(error);
    });
  }

  closeOrderPage(){
    this.closePopUp.emit();
  }
}
