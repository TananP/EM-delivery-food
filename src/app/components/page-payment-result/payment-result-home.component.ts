import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment-result-home',
  templateUrl: './payment-result-home.component.html',
  styleUrls: ['./payment-result-home.component.scss']
})
export class PaymentResultHomeComponent implements OnInit {
  public resultValue = this.route.snapshot.queryParamMap;
  public code: any;
  public orderNumber: any;
  public resultMessage: string;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    if (this.resultValue.get('code') !== null){
      this.code = this.resultValue.get('code');
      if (this.code === '00') {
        this.resultMessage = 'Payment Successful';
      }else if (this.code === '01') {
        this.resultMessage = 'Payment Pending';
      }else if (this.code === '02') {
        this.resultMessage = 'Payment Rejected';
      }else if (this.code === '03') {
        this.resultMessage = 'Payment was canceled';
      }else {
        this.resultMessage = 'Payment Failed';
      }
    }else {
      this.code = 'undifind code';
      this.resultMessage = 'Payment Failed';
    }
    if (this.resultValue.get('orderNumber') !== null){
      this.orderNumber = this.resultValue.get('orderNumber');
    }else {
      this.orderNumber = 'undifind order number';
    }
  }

}
