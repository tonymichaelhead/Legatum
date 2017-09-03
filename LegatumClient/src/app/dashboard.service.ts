import { Injectable } from '@angular/core';
import { Contract } from './models/contract/contract.interface';

@Injectable()
export class DashboardService {

  //hold user profile info
  newContract: Contract = {
      contractNickname: 'default',
      contractId: 781432098374,
      createdAt: 'default',
      willText: 'default',
      fileName: 'No file was selected.',
      beneficiaries: '1212dddddd3'
    }
  //hold new contract info

  constructor() { }
  
  setContractInfo(contract: Contract) {
    this.newContract = contract;
    console.log('new contract set in DashboardService: ', this.newContract);
  }

}
