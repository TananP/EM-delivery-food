import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-check-login',
  templateUrl: './check-login.component.html',
  styleUrls: ['./check-login.component.scss']
})
export class CheckLoginComponent implements OnInit {
  public loginCode = this.route.snapshot.paramMap.get('loginID');
  public tokenObj: any;
  constructor(private route: ActivatedRoute, private authorizationAPI: AuthorizationService, private router: Router) {
    // console.log(this.loginCode);
    this.authorizationAPI.getToken(this.loginCode).subscribe(x => {
      // console.log(x);
      this.tokenObj = x;
    }, error => {
      // redirect local hosty
      // window.location.href = 'http://emfood.yipintsoi.com/web_api/api/Authentication/SigninLine?callback=Y';
      // redirect to production
      // window.location.href = 'http://emfood.yipintsoi.com/web_api/api/Authentication/SigninLine';
    }, () => {
      // No errors and on completed
      localStorage.setItem('token', JSON.stringify(this.tokenObj));
      this.router.navigate(['']);
    });
  }

  ngOnInit(): void {
  }

}
