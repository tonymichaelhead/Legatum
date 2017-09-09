import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { DashboardService } from '../dashboard.service';
import { Observable } from 'rxjs/Observable';
import { Contract } from '../models/contract/contract.interface';
import { UserInfo } from '../models/user-info/user-info.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DashboardService]
})

export class DashboardComponent {
  name: string = this.authService.email;
  sub: any;

  userInfo: UserInfo = {
    createdAt: '',
    email: '',
    pub_key: '',
    ssn: 0,
    updatedAt: '',
    user_id: '',
    username: ''
  };

  constructor(
    private authService: AuthService, 
    private dashboardService: DashboardService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient) {
  }

  logout(): any {
    // this.authService.logout();
    return new Promise(() => {
      this.authService.logout();
    }).then(() => {
      console.log('You have arrived');
      this.router.navigateByUrl('/home');
    });
  }

  getUserInfo(email: string): void {
    console.log('getUserInfo was fired');
    this.http.get('/findemail', { params: new HttpParams().set('email', this.name)})
      .subscribe((data: UserInfo) => {
        console.log('userInfo GET: ', data);
        this.userInfo = {
          createdAt: data.createdAt,
          email: data.email,
          pub_key: data.pub_key,
          ssn: data.ssn,
          updatedAt: data.updatedAt,
          user_id: data.user_id,
          username: data.username
        }
        console.log('updated user info: ', this.userInfo);
        //Update the dashboard service with user info so other components can access it
        
        this.dashboardService.setUserInfo(this.userInfo);
        //Call setContractsInfo
        // this.dashboardService.getAndSetContracts();
      });
  }

  ngOnInit() {
    console.log('Dashboard is loaded!')
    console.log('Name is: :', this.name);
    this.getUserInfo(this.name);
    this.name = this.dashboardService.userInfo.email;
  }
}  