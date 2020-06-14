import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/authorization.service';
// import {HeaderComponent} from 'src/app/layouts/header/header/header.component';

@Component({
  selector: 'app-check-login',
  templateUrl: './check-login.component.html',
  styleUrls: ['./check-login.component.scss']
})
export class CheckLoginComponent implements OnInit {
  public loginCode = this.route.snapshot.paramMap.get('loginID');
  public tokenObj: any;
  public openErrorPopUp = false;
  public errorMessage = '';
  constructor(private route: ActivatedRoute, private authorizationAPI: AuthorizationService, private router: Router) {
    // console.log(this.loginCode);
    this.authorizationAPI.getToken(this.loginCode).subscribe(x => {
      // console.log(x);
      this.tokenObj = x;
      localStorage.setItem('token', JSON.stringify(this.tokenObj));
      this.getLineInfo(this.tokenObj.userName, this.tokenObj.token);
    }, error => {
      this.errorMessage = 'Please re-login agian';
      this.openErrorPopUp = true;
    });
    // , () => {
    //   // No errors and on completed
    //   // localStorage.setItem('token', JSON.stringify(this.tokenObj));
    //   // window.location.href = 'http://localhost:4200/#/delivery';
    //   // window.location.href = 'http://emfood.yipintsoi.com/customer/#/delivery';
    //   // this.router.navigate(['/delivery']);
    // });
  }

  ngOnInit(): void {
  }

  reLogin(){
       // redirect local hosty
      // window.location.href = 'http://emfood.yipintsoi.com/web_api/api/Authentication/SigninLine?callback=Y';
      // redirect to production
      window.location.href = 'http://emfood.yipintsoi.com/web_api/api/Authentication/SigninLine';
  }
  getLineInfo(lineId, token){
    // console.log(lineId);
    this.authorizationAPI.getLineIdInfo(lineId, token).subscribe(x => {
      const userProfile = x;
      localStorage.setItem('userProfile', JSON.stringify(userProfile));
    }, error => {
      this.errorMessage = 'Please re-login agian';
      this.openErrorPopUp = true;
    }, () => {
      // window.location.href = 'http://localhost:4200/#/delivery';
      window.location.href = 'http://emfood.yipintsoi.com/customer/#/delivery';
    });
  }

}
