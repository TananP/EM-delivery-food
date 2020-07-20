import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {AuthorizationService} from 'src/app/services/authorization.service';
import { Injectable } from '@angular/core';
@Injectable({providedIn: 'root'})
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
@Input() profilePopUp: boolean;
@Output() closePopUp = new EventEmitter();

public profileImg = '';
public fullName = '';
public mobileNumber = '';

public nameRender: any;
public phoneRender: any;

public nameValue: string;
public mobileValue: string;

public editInfo: boolean;
private userProfile: any;

  constructor(private authorizationService: AuthorizationService) { }

  ngOnInit(): void {
    this.authorizationService.checkAuthorization();
    this.editInfo = false;
    this.nameRender = document.getElementById('nameFull');
    this.phoneRender = document.getElementById('mobileNumber');
    this.getUserInfo();
  }

  closeProfilePage(){
    // this.profilePopUp = false;
    this.closePopUp.emit();
  }

  getUserInfo(){
    this.userProfile = JSON.parse(localStorage.getItem('userProfile'));
    this.fullName = '';
    this.mobileNumber = '000000';
    if (this.userProfile === null) {
      this.profileImg = './assets/dist/img/no-picture-200.png';
      this.fullName = '-';
      // this.mobileNumber = '-';
    } else {
      this.profileImg = this.userProfile.picture;
      if (this.userProfile.fullName  === null || this.userProfile.fullName === ''){
        this.fullName = 'Your profile not have full name';
        // document.getElementById('nameFull').innerHTML = this.fullName;
      }else{
        this.fullName = this.userProfile.fullName;
        // document.getElementById('nameFull').innerHTML = this.fullName.toString();
      }
      if (this.userProfile.mobileNumber  === null || this.userProfile.mobileNumber  === ''){
        this.mobileNumber = 'Your profile not have mobile number';
        // document.getElementById('mobileNumber').innerHTML = this.mobileNumber;
      }else{
        this.mobileNumber = this.userProfile.mobileNumber;
        // document.getElementById('mobileNumber').innerHTML = this.mobileNumber.toString();
      }
    }
  }

  // getNewUserInfo(){
  //   // this.
  // }

  edit(){
    if (this.fullName === 'Your profile not have full name') {
      this.nameValue = '';
    }else {
      this.nameValue = this.fullName;
    }
    if (this.mobileNumber === 'Your profile not have mobile number') {
      this.mobileValue = '';
    }else {
      this.mobileValue = this.mobileNumber;
    }
    // this.fullName = this.fullName.toString();
    // console.log(this.fullName);
    this.editInfo = true;
  }
  comfiremEdit(fullName , mobileNumber){
    if (fullName !== '' && mobileNumber !== '') {
        this.authorizationService.updateLineIdInfo(fullName, mobileNumber).subscribe( x => {
        // console.log(x);
        this.userProfile.fullName = fullName;
        this.userProfile.mobileNumber = mobileNumber;
        this.fullName = fullName;
        this.mobileNumber = mobileNumber;
        localStorage.setItem('userProfile' , JSON.stringify(this.userProfile));
        this.editInfo = false;
        // this.getUserInfo();
        // localStorage.removeItem('userProfile');
        // this.getNewUserInfo();
        // window.location.reload();
      }, error => {
        console.log(error);
      });
    }
  }
  // updateProfile(){
  //   this.editInfo = true;
  //   this.getUserInfo();
  //   this.editInfo = false;
  // }

  // cancelEdit(){
  //   this.editInfo = false;
  // }
}
