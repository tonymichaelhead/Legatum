import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DashboardService } from '../dashboard.service';
import { AuthService } from '../auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import { Observer } from 'rxjs/Observer';

@Component({
  selector: 'app-my-contracts',
  templateUrl: './my-contracts.component.html',
  styleUrls: ['./my-contracts.component.css']
})

export class MyContractsComponent implements OnInit, OnDestroy {

  email: string = this.dashboardService.userInfo.email;
  name: string;
  subscription: any;

  // Initialize contracts to a default value
  contracts = [];

  @Output() onCreateFormClick = new EventEmitter();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dashboardService: DashboardService,
    private http: HttpClient,
    private authService: AuthService) { }

  handleCreateFormClick() {
    this.onCreateFormClick.emit();
    console.log('create form was clicked')
  }

  /* Tell the dashboardService to load itself with userInfo
  so that we can subscribe to it*/
  getUserInfo(): void {
    this.dashboardService.getAndSetUserInfo();   
  }

    /* Tell the dashboardService to load itself with user's contracts
  so that we can subscribe to it*/
  getUserContracts(): void {
    this.dashboardService.getAndSetContracts();
  }

  subscribeContracts() {
    this.subscription = this.dashboardService.contractsChange$.subscribe( item => {
      this.contracts = item;
    });
    console.log('The contracts loaded in MyContracts are: ', this.contracts);
  }

  ngOnInit() {
    this.getUserContracts();
    this.subscribeContracts();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
