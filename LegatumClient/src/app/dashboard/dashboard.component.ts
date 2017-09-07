import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DashboardService]
})

export class DashboardComponent {
  name: string;
  sub: any;

  user = {
    user_id: 1,
    username: 'Tony',
    pubKey: '1231ars',
    ssn: 12341321
  };

  constructor(
    private authService: AuthService,
    private dashboardService: DashboardService,
    private router: Router,
    private route: ActivatedRoute) {
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

  
  ngOnInit() {
    this.name = this.authService.email;
  }
}

