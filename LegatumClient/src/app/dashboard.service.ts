import { Injectable } from '@angular/core';
import { Contract } from './models/contract/contract.interface';
import { UserInfo } from './models/user-info/user-info.interface';

@Injectable()
export class DashboardService {

  userInfo: UserInfo; 
  
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

  // getUserInfo(email: string) {

  // }
}
