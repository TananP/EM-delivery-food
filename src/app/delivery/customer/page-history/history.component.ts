import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CustomerOrderService } from 'src/app/services/customer-order.service';
import {AuthorizationService} from 'src/app/services/authorization.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
@Input() historyPopUp: boolean;
@Output() closePopUp = new EventEmitter();

public historyList: any;
public selectHistoryList: any;
public historyIsNull = false;
public showHistoryInfo = false;
public openLoadingPopUp = false;
public errorCallApi = false;

  constructor(private customerOrderService: CustomerOrderService, private authorizationService: AuthorizationService) { }

  ngOnInit(): void {
    this.authorizationService.checkAuthorization();
    this.historyList = [];
    this.openLoadingPopUp = true;
    this.customerOrderService.getOrderHistory().subscribe( x => {
      this.historyList = x;
      this.openLoadingPopUp = false;
      // console.log(this.historyList);
    }, error => {
      if (error.error === null){
        this.historyIsNull = true;
      }
      console.log(error);
      this.openLoadingPopUp = false;
      this.errorCallApi = false;
    });
  }

  // closeHistoryPage(){
  //   this.closePopUp.emit();
  // }
  backFromHistoryInfo(){
    this.showHistoryInfo = false;
  }
  selectHistory(orderNumber){
    this.selectHistoryList = orderNumber;
    // console.log(this.selectHistoryList);
    this.showHistoryInfo = true;
  }
}
