import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';

import { Router, NavigationStart, ActivatedRoute } from '@angular/router';
import { Contract } from '../models/contract/contract.interface'; 
import { DashboardService } from '../dashboard.service';



declare var window: any;

@Component({
  selector: 'app-contract-form',
  templateUrl: './contract-form.component.html',
  styleUrls: ['./contract-form.component.css']
})

export class ContractFormComponent {

  createFormWasClicked = false;
  showMyContracts = true;
  dataSetEvent: any;

  newContract: any = {
    contract_nickname: '',
    will_text: '',
    file_name: 'No file attached.',
    beneficiary: '',
    hash: 'rstrastaarst'
  };

  constructor(
    private router: Router,
    private dashboardService: DashboardService) {
  }

  handleClickOnReview() {
    console.log('Details: ', this.newContract);
    this.dashboardService.setContractInfo(this.newContract);
    this.router.navigate(['/dashboard/review-contract'], { queryParams: { newContract: this.newContract }})
  }
}
