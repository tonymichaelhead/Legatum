import { Component, Input, OnInit } from '@angular/core';
import { Contract } from '../models/contract/contract.interface';

@Component({
  selector: 'app-contract-preview',
  templateUrl: './contract-preview.component.html',
  styleUrls: ['./contract-preview.component.css']
})
export class ContractPreviewComponent implements OnInit {

  @Input() contract: Contract;

  constructor() { }

  ngOnInit() {
    console.log('contract preview: ', this.contract);
  }
}
