import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CustomerOrderService } from 'src/app/services/customer-order.service';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
@Input() historyPopUp: boolean;
@Output() closePopUp = new EventEmitter();

public historyIsNull = false;
  constructor(private customerOrderService: CustomerOrderService) { }

  ngOnInit(): void {
    this.customerOrderService.getOrderHistory().subscribe( x => {
      console.log(x);
    }, error => {
      if (error.error === null){
        this.historyIsNull = true;
      }
      console.log(error);
    });
  }

  closeHistoryPage(){
    this.closePopUp.emit();
  }
}
