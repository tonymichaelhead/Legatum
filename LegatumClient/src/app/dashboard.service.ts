import { Injectable } from '@angular/core';
import { Contract } from './models/contract/contract.interface';
import { UserInfo } from './models/user-info/user-info.interface';
import { HttpClient, HttpParams } from '@angular/common/http';

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

  //user contracts

  contracts: any[];
  
  //hold user profile info
  newContract: any = {
      username: this.userInfo.username,
      contract_nickname: 'default',
      will_text: 'default',
      file_name: 'No file was selected.',
      beneficiary: '1212dddddd3',
      hash: '012741923487'
    }
  //hold new contract info

  constructor(
    private http: HttpClient) { }
  
  //Holds temporary new contract info for creation
  setContractInfo(contract: Contract) {
    this.newContract = contract;
    console.log('new contract set in DashboardService: ', this.newContract);
  }
  //Get contracts for render on the Dashboard
  getAndSetContracts() {
      console.log('The username sent for contracts is: ', this.userInfo.username);
      this.http.get ('findallcontract', {
        params: new HttpParams().set('username', this.userInfo.username)
      })
        .subscribe((data) => {
          console.log('The user wills returned are: ', data);
        })
  }

  setUserInfo(userInfo: UserInfo) {
    this.userInfo = userInfo;
    console.log('New userInfo set in DashboardService: ', this.userInfo);
    this.getAndSetContracts();
  }


  // getUserInfo(email: string) {

  // }
}
