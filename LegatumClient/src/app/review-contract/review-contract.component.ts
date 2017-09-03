import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { Contract } from '../models/contract/contract.interface';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-review-contract',
  templateUrl: './review-contract.component.html',
  styleUrls: ['./review-contract.component.css']
})
export class ReviewContractComponent implements OnInit {

  sub: any;
  newContract: Contract;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dashboardService: DashboardService
  ) { }

  ngOnInit() {
    this.newContract = this.dashboardService.newContract
    console.log('review contents: ', this.newContract.willText);
  }
}
