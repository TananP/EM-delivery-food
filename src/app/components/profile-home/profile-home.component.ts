import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {AuthorizationService} from 'src/app/services/authorization.service';

@Component({
  selector: 'app-profile-home',
  templateUrl: './profile-home.component.html',
  styleUrls: ['./profile-home.component.scss']
})
export class ProfileHomeComponent implements OnInit {
@Input() profilePopUp: boolean;
@Output() closePopUp = new EventEmitter();

public profileImg = '';
public fullName = '';
public mobileNumber = 0;


public nameValue: string;
public mobileValue: number;

public editInfo = false;
private userProfile: any;

  constructor(private authorizationService: AuthorizationService) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  closeProfilePage(){
    // this.profilePopUp = false;
    this.closePopUp.emit();
  }

  getUserInfo(){
    this.userProfile = JSON.parse(localStorage.getItem('userProfile'));
    if (this.userProfile === null) {
      this.profileImg = './assets/dist/img/no-picture-200.jpg';
      this.fullName = '-';
      // this.mobileNumber = '-';
    } else {
      this.profileImg = this.userProfile.picture;
      if (this.userProfile.fullName  == null){
        this.fullName = 'Your profile not have full name';
      }else{
        this.fullName = this.userProfile.fullName;
      }
      if (this.userProfile.mobileNumber  == null){
        // this.mobileNumber = 'Your profile not have mobile number';
        // document.getElementById('mobileNumber').innerHTML = this.mobileNumber;
      }else{
        this.mobileNumber = this.userProfile.mobileNumber;
        // document.getElementById('mobileNumber').innerHTML = this.mobileNumber;
      }
    }
  }

  // getNewUserInfo(){
  //   // this.
  // }

  edit(){
    this.nameValue = this.fullName;
    this.mobileValue = this.mobileNumber;
    // this.fullName = this.fullName.toString();
    // console.log(this.fullName);
    this.editInfo = true;
  }
  comfiremEdit(fullName , mobileNumber){
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

  cancelEdit(){
    this.editInfo = false;
  }
}
