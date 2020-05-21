import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-check-login',
  templateUrl: './check-login.component.html',
  styleUrls: ['./check-login.component.scss']
})
export class CheckLoginComponent implements OnInit {
  public login = this.route.snapshot.paramMap.get('loginID');
  public tokenObj: any;
  constructor(private route: ActivatedRoute, private authorizationAPI: AuthorizationService, private router: Router) {}

  ngOnInit(): void {
    this.authorizationAPI.getToken(this.login).subscribe(x => {
      this.tokenObj = x;
    }, error => {
      window.location.href = 'http://emfood.yipintsoi.com/web_api/api/Authentication/SigninLine';
    }, () => {
      // No errors and on completed
      localStorage.setItem('token', this.tokenObj.token);
      this.router.navigate(['']);
      console.log(this.tokenObj);
    });
  }

}
