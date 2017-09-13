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

  chatInitiated: boolean;
  haveUsername: boolean;
  roomAvailable: boolean;
  socket = io();

  constructor(
    private router: Router,
    private dashboardService: DashboardService ) {
      
      this.chatInitiated = false;
      this.haveUsername = false;
      this.roomAvailable = false;

    }

  ngOnInit() {
  }

  handleAdminAccept(): void {
    console.log('#1 ADMIN CHAT: admin chat button clicked');
    this.chatInitiated = true;
  }

  handleChatRequest(): void {
    console.log('#2 ADMIN CHAT: handleChatRequest button clicked');
    this.haveUsername = true;
    this.socket.emit('adminAcceptChat', 'admin');
    console.log('#3 ADMIN CHAT: firing off adminAcceptChat');
  }

}
