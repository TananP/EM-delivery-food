import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loading-pop-up',
  templateUrl: './loading-pop-up.component.html',
  styleUrls: ['./loading-pop-up.component.scss']
})
export class LoadingPopUpComponent implements OnInit {
@Input() openLoadingPopUp: boolean;
  constructor() { }

  ngOnInit(): void {
  }

}
