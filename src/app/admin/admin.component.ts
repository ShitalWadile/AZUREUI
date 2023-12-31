import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { loginService } from '../service/login.service';
import { UserstoreService } from '../service/userstore.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public users: any[] = [];
  public givenname: string = "";

  constructor(
    private http: AppService,
    private router: Router,
    private auth: loginService,
    private user: UserstoreService
  ) { }

  ngOnInit() {
    this.user.getgivenNameFromStore().subscribe((val: any) => {
      let givenNameFromToken = this.auth.getgivenNameFromToken();
      this.givenname = val || givenNameFromToken;
    });
  }
}
