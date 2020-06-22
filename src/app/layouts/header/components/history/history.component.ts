import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
@Input() historyPopUp: boolean;
@Output() closePopUp = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  closeHistoryPage(){
    this.closePopUp.emit();
  }
}
