import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-profile-home',
  templateUrl: './profile-home.component.html',
  styleUrls: ['./profile-home.component.scss']
})
export class ProfileHomeComponent implements OnInit {
@Input() profilePopUp: boolean;
@Output() closePopUp = new EventEmitter();
public fullName = '';
public mobileNumber = '';
public profileImg = '';
  constructor() { }

  ngOnInit(): void {
    this.getUserInfo();
  }
  closeProfilePage(){
    // this.profilePopUp = false;
    this.closePopUp.emit();
  }
  getUserInfo(){
    const userProfile = JSON.parse(localStorage.getItem('userProfile'));
    if (userProfile === null) {
      this.profileImg = './assets/dist/img/no-picture-200.jpg';
      this.fullName = '-';
      this.mobileNumber = '-';
    } else {
      this.profileImg = userProfile.picture;
      if (userProfile.fullName  == null){
        this.fullName = 'Your profile not have full name';
      }else{
        this.fullName = userProfile.fullName;
      }
      if (userProfile.mobileNumber  == null){
        this.mobileNumber = 'Your profile not have mobile number';
        // document.getElementById('mobileNumber').innerHTML = this.mobileNumber;
      }else{
        this.mobileNumber = userProfile.mobileNumber;
        // document.getElementById('mobileNumber').innerHTML = this.mobileNumber;
      }
    }
  }
}
