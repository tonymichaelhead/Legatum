import { Injectable } from '@angular/core';
import { Contract } from './models/contract/contract.interface';
import { UserInfo } from './models/user-info/user-info.interface';

@Injectable()
export class DashboardService {

  userInfo: UserInfo = {
    createdAt: '',
    email: '',
    pub_key: '',
    ssn: 0,
    updatedAt: '',
    user_id: '',
    username: ''
  } 
  
  //hold user profile info
  newContract: any = {
      contract_nickname: 'default',
      will_text: 'default',
      file_name: 'No file was selected.',
      beneficiary: '1212dddddd3',
      hash: '012741923487'
    }
  //hold new contract info

  constructor() { }
  
  setContractInfo(contract: Contract) {
    this.newContract = contract;
    console.log('new contract set in DashboardService: ', this.newContract);
  }

  setUserInfo(userInfo: UserInfo) {
    this.userInfo = userInfo;
    console.log('New userInfo set in DashboardService: ', this.userInfo)
  }

  // getUserInfo(email: string) {

  // }
}
