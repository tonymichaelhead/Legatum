import { Component, OnInit } from '@angular/core';


import * as Web3 from 'web3';
import * as contract from 'truffle-contract';
import * as will from '../../../build/contracts/will.json';

console.log(will);
declare var window: any;


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit {
  web3: any;
  user = {
    user_id: 1,
    username: 'Tony',
    pubKey: '1231ars',
    ssn: 12341321
  }

  createFormWasClicked = false;
  showMyContracts = true;
  constructor() { 

  }

  showCreateForm() {
    this.createFormWasClicked = true;
    this.showMyContracts = false;
  }

  checkAndInstantiateWeb3 = () => {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof typeof window.web3 !== 'undefined') {
      console.log(
        "Using web3 detected from external source. If you find that your accounts don\'t appear or you have 0 MetaCoin, ensure you\'ve configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask"
      );
      // Use Mist/MetaMask's provider
      this.web3 = new Web3(window.web3.currentProvider);
    } else {
      console.log(
        "No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it\'s inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask"
      );
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      this.web3 = new Web3(
        new Web3.providers.HttpProvider('http://localhost:8545')
      );
    }
  }


  onCreateFormClick() {
    console.log('event was heard from dashboard')
    this.showCreateForm();

  }

  ngOnInit() {
    this.checkAndInstantiateWeb3();
    //send get request for user profile info
    //set state with that info
    console.log('user info: ', this.user);
  }

}
