import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../../dashboard.service';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import { Observer } from 'rxjs/Observer';

@Component({
  selector: 'app-pending-contracts',
  templateUrl: './pending-contracts.component.html',
  styleUrls: ['./pending-contracts.component.css']
})
export class PendingContractsComponent implements OnInit {

  subscription: any;

  pendingContracts = [
    {
      contractNickname: 'Another will',
      contractId: '123489-0',
      createdAt: '01/01/0001'
    },
    {
      contractNickname: 'cool will',
      contractId: '000000',
      createdAt: '12/25/2000'
    },
    {
      contractNickname: 'Smart Contract',
      contractId: '81818181818',
      createdAt: '04/01/3001'
    }
  ];

  constructor(
    private router: Router,
    private dashboardService: DashboardService,
    private http: HttpClient ) { }

    getPendingContracts() {
      this.subscription = this.dashboardService.pendingContractsChange$.subscribe( item => {
        this.pendingContracts = item;
      });
      console.log('The updated pending contracts in pending-contracts: ', this.pendingContracts);
    }

  ngOnInit() {
    this.dashboardService.getAndSetPending();
    this.pendingContracts = this.dashboardService.currentPending();
    this.getPendingContracts();
  }

}
