import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Contract } from '../models/contract/contract.interface'; 
import { Router, ActivatedRoute } from '@angular/router'
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-contract-form',
  templateUrl: './contract-form.component.html',
  styleUrls: ['./contract-form.component.css']
})
export class ContractFormComponent implements OnInit {

  newContract: Contract = {
    contractNickname: '',
    contractId: 10000000,
    createdAt: '01/01/0001',
    willText: 'No text',
    fileName: 'No file attached.',
    beneficiaries: ''
  }

  constructor(
    private router: Router,
    private dashboardService: DashboardService) { }

  handleClickOnReview() {
    console.log('Details: ', this.newContract);
    this.dashboardService.setContractInfo(this.newContract);
    this.router.navigate(['/dashboard/review-contract'], { queryParams: { newContract: this.newContract }})
  }

  ngOnInit() {
  }

}
