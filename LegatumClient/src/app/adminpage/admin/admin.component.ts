import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MdSidenavModule } from '@angular/material';
import { DashboardService } from '../../dashboard.service';
import { SocketIoModule, SocketIoConfig, Socket } from 'ng-socket-io';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(
    private router: Router,
    private dashboardService: DashboardService ) { }

  ngOnInit() {
  }

  handleAdminAccept(): void {
    console.log('#1 ADMIN CHAT: admin chat button clicked');
  }

}
