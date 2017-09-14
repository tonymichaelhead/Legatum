import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { DashboardService } from '../dashboard.service';
import { Observable } from 'rxjs/Observable';
import { Contract } from '../models/contract/contract.interface';
import { UserInfo } from '../models/user-info/user-info.interface';
import { HomeComponent } from '../home/home.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DashboardService]
})

export class DashboardComponent implements OnInit {
  name: string = this.authService.email;
  sub: any;
  subscription: any;

  userInfo: UserInfo = {
    admin: false,
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
    return new Promise(() => {
      this.authService.logout();
    }).then(() => {
      console.log('You have arrived');
      this.router.navigateByUrl('/home');
    });
  }

  // Instruct DashboardService to grab userInfo
  getUserInfo(): void {
    this.dashboardService.getAndSetUserInfo();
  }

  // Subscribe to userInfo which is originally fetched from the dashboardService
  subscribeToUserInfo() {
    this.subscription = this.dashboardService.userInfoChange$.subscribe(item => {
      this.userInfo = item;
    });
    console.log('The new userInfo in DashboardComponent is: ', this.userInfo);
  }

  ngOnInit() {
    console.log('Dashboard is loaded!')
    console.log('Name is: :', this.name);

    // Testing Login flow
    this.getUserInfo();
    // Tell DashboardService to fetch contracts

    // Subscribe to userInfoObservable in DashboardService
    this.subscribeToUserInfo();
  }
}
