import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-history-information',
  templateUrl: './history-information.component.html',
  styleUrls: ['./history-information.component.scss']
})
export class HistoryInformationComponent implements OnInit {
  @Input() historyInfo: object;
  @Output() back = new EventEmitter();
  public selectHistoryInfo: any;
  constructor() { }

  ngOnInit(): void {
    this.selectHistoryInfo = this.historyInfo;
    // console.log(this.selectHistoryInfo);
  }
  backToHistoryList(){
    this.back.emit();
  }
}
