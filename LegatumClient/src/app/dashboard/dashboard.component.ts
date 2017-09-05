import { Component, HostListener } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {

  user = {
    user_id: 1,
    username: 'Tony',
    pubKey: '1231ars',
    ssn: 12341321
  };


  constructor() {

  }




  showCreateForm() {
    // this.createFormWasClicked = true;
    // this.showMyContracts = false;
  }

  onCreateFormClick() {
    console.log('event was heard from dashboard')
    this.showCreateForm();
  }

  }
