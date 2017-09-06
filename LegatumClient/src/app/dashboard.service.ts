import { Injectable } from '@angular/core';
import { Contract } from './models/contract/contract.interface';

@Injectable()
export class DashboardService {

  //hold user profile info
  newContract: Contract = {
      contractNickname: 'default',
      willText: 'default',
      fileName: 'No file was selected.',
      beneficiaries: '1212dddddd3',
      hash: '012741923487'
    }
  //hold new contract info

  constructor() { }
  
  setContractInfo(contract: Contract) {
    this.newContract = contract;
    console.log('new contract set in DashboardService: ', this.newContract);
  }

}
