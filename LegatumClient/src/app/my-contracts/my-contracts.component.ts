import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { DashboardService } from '../dashboard.service';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-my-contracts',
  templateUrl: './my-contracts.component.html',
  styleUrls: ['./my-contracts.component.css']
})
export class MyContractsComponent implements OnInit {

  email: string = this.dashboardService.userInfo.email;
  name: string;
  sub: any;

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
  @Output() onCreateFormClick = new EventEmitter();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dashboardService: DashboardService,
    private http: HttpClient,  
  ) { }

  handleCreateFormClick() {
    this.onCreateFormClick.emit();
    console.log('create form was clicked')
  }

  getUserContracts() {
    this.http.get ('SOMETHING', {
      params: new HttpParams().set('email', this.email)
    })
      .subscribe(data => {
        console.log('The user wills returned are: ', data);
      })
  }

  ngOnInit() {
    this.getUserContracts();
  }

}
