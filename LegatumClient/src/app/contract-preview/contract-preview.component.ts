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
    // etherscan sample address 
    // https://ropsten.etherscan.io/address/0x24b6bbf15b798988a7f4eab170edebe6bbc3cc1d
  }

}
