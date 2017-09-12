import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MdSidenavModule } from '@angular/material';
import { DashboardService } from '../../dashboard.service';
import { SocketIoModule, SocketIoConfig, Socket } from 'ng-socket-io';

declare var $: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  chatInitiated: boolean;
  haveUsername: boolean;
  roomAvailable: boolean;
  chatEnded: boolean;
  socket = io();
  username: string;
  userID: string;

  constructor(
    private router: Router,
    private dashboardService: DashboardService ) {
      
      this.chatInitiated = false;
      this.haveUsername = false;
      this.roomAvailable = false;
      this.chatEnded = false;
      this.username = '';
      this.userID = '';

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
    this.roomAvailable = true;
  }

  handleSendMessage(): void {
    const message = $('#chat-input').val();
    this.socket.emit('chatMessage', message);
    $('#chat-input').val('');
  }

  handleEndChat(): void {
    this.chatInitiated = false;
    console.log('##CHAT CLIENT: request to end chat button was clicked.');
    // TODO: what should happen here??

    // replace the initiate chat button, but remove everything else
    // reset vars
    this.roomAvailable = false;

    // terminate socket.io connection
    // remove user from userQueue
    console.log('##CHAT CLIENT: sending disconnect event to server');
    // TODO: may need to build endChat if needed
    // this.socket.emit('endChat');
    this.username = '';
    this.userID = '';
    this.chatEnded = true;
    
    // TODO: restore chat button

    this.socket.emit('ended');
    this.socket.disconnect();
  }

}
