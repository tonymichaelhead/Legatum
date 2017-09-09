import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { DashboardService } from '../dashboard.service';
import { AuthService } from '../auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import {Observer} from 'rxjs/Observer';

@Component({
  selector: 'app-my-contracts',
  templateUrl: './my-contracts.component.html',
  styleUrls: ['./my-contracts.component.css']
})

export class MyContractsComponent implements OnInit {

  email: string = this.dashboardService.userInfo.email;
  name: string;
  subscription: any;

  contracts = [
    {
      contractNickname: 'Another will',
      contractId: '123489-0',
      createdAt: '01/01/0001'
    }
  ];

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

  getUserContracts() {
    this.subscription = this.dashboardService.contractsChange$.subscribe( item => {
      this.contracts = item;
    })
    console.log('The reset contracts in my-contracts: ', this.contracts);
  }

  ngOnInit() {
    //Get user contracts
    this.dashboardService.getAndSetContracts();
    this.contracts = this.dashboardService.currentContracts();
    this.getUserContracts();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
