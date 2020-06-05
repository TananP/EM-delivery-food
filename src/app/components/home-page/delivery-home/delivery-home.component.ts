import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-delivery-home',
  templateUrl: './delivery-home.component.html',
  styleUrls: ['./delivery-home.component.scss']
})
export class DeliveryHomeComponent implements OnInit {

  constructor(private authorizationAPI: AuthorizationService) {}

  ngOnInit(): void {
    this.authorizationAPI.checkAuthorization();
  }

}
