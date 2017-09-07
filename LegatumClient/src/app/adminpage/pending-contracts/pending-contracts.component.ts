import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pending-contracts',
  templateUrl: './pending-contracts.component.html',
  styleUrls: ['./pending-contracts.component.css']
})
export class PendingContractsComponent implements OnInit {
  contracts = [
    {
      contractNickname: 'Another will',
      contractId: '123489-0',
      createdAt: '01/01/0001'
    },
    {
      contractNickname: 'cool will',
      contractId: '000000',
      createdAt: '12/25/2000'
    },
    {
      contractNickname: 'Smart Contract',
      contractId: '81818181818',
      createdAt: '04/01/3001'
    }
  ];

  constructor(private router: Router ) { }



  ngOnInit() {
  }

}
