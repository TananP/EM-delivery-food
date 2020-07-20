import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { timer } from 'rxjs';

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
  public countDown = 5;

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.router.navigate(['']);
    // if (this.resultValue.get('code') !== null){
    //   this.code = this.resultValue.get('code');
    //   if (this.code === '00') {
    //     this.resultMessage = 'Payment Successful';
    //   }else if (this.code === '01') {
    //     this.resultMessage = 'Payment Pending';
    //   }else if (this.code === '02') {
    //     this.resultMessage = 'Payment Rejected';
    //   }else if (this.code === '03') {
    //     this.resultMessage = 'Payment was canceled';
    //   }else {
    //     this.resultMessage = 'Payment Failed';
    //   }
    // }else {
    //   this.code = 'undifind code';
    //   this.resultMessage = 'Payment Failed';
    // }
    // if (this.resultValue.get('orderNumber') !== null){
    //   this.orderNumber = this.resultValue.get('orderNumber');
    // }else {
    //   this.orderNumber = 'undifind order number';
    // }
    // this.countDownFuc();
  }
  // countDownFuc(){
  //   this.countDown -= 1;
  //   console.log(this.countDown);
  //   if (this.countDown === 0) {
  //     this.router.navigate(['']);
  //   }else {
  //     setTimeout( () => { this.countDownFuc(); }, 1000);
  //   }
  // }
}
