import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CustomerOrderService } from 'src/app/services/customer-order.service';

@Component({
  selector: 'app-order-information',
  templateUrl: './order-information.component.html',
  styleUrls: ['./order-information.component.scss']
})
export class OrderInformationComponent implements OnInit {
  @Input() orderInfo: object;
  // @Input() showOrderInfo: boolean;
  @Output() back = new EventEmitter();
  public selectOrderInfo: any;

  constructor(private customerOrderService: CustomerOrderService) { }

  ngOnInit(): void {
    // console.log(this.orderInfo);
    this.selectOrderInfo = this.orderInfo;
    // this.customerOrderService.checkStatusByOrderNumber(this.orderID).subscribe( x => {
    //   // console.log(x);
    // });
  }

  backToOrderList(){
    this.back.emit();
  }
}
