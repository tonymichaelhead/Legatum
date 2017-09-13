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
  adminName: string;
  adminID: string;
  queueSize: number;

  constructor(
    private router: Router,
    private dashboardService: DashboardService ) {
      
      this.chatInitiated = false;
      this.haveUsername = false;
      this.roomAvailable = false;
      this.chatEnded = false;
      this.username = '';
      this.userID = '';
      this.adminName = '';
      this.adminID = '';
      this.queueSize = 0;

    }

  // init chat

  getQueueSize(): void {
    this.socket.emit('getQueueSize');
  }

  handleChatRequest(): void {
    console.log('#1 ADMIN CHAT: admin chat button clicked');
    this.chatInitiated = true;
    this.haveUsername = false;
    if (!this.socket.connected) {
      console.log('reconnecting socket!!!!!!!!!!');
      this.socket.connect();
    }
    console.log('#1.1 ADMIN CHAT: Admin has clicked the chat button');
  }

  handleAdminAccept(): void {
    console.log('#2 ADMIN CHAT: handleChatRequest button clicked');
    this.haveUsername = true;
    this.adminName = $('#chat-username').val() || 'admin';
    this.adminID = this.socket.id;
    this.socket.emit('adminAcceptChat', this.adminName, this.adminID);
    console.log('#3 ADMIN CHAT: firing off adminAcceptChat');
    this.roomAvailable = true;
  }

  // handle chat

  handleSendMessage(): void {
    const message = $('#chat-input').val();
    this.socket.emit('chatMessage', message);
    $('#chat-input').val('');
  }

  // end chat

  handleEndChat(): void {
    this.chatInitiated = false;
    console.log('##CHAT CLIENT: request to end chat button was clicked.');
    this.roomAvailable = false;
    console.log('##CHAT CLIENT: sending disconnect event to server');
    this.username = '';
    this.userID = '';
    this.chatEnded = true;
    this.haveUsername = false;
    this.socket.emit('ended', this.username, this.userID);
    console.log('ADMIN SENT ENDED TO SOCKET ID = ', this.username);
    // this.socket.to(this.userID).emit('ended');
    // this.socket.disconnect();
  }

  ngOnInit() {
    this.getQueueSize();

    // Event Listeners

    this.socket.on('firstInLine', (username, socketid) => {
      this.username = username;
      this.userID = socketid;
      this.haveUsername = true;
      console.log('ADMIN HEARD USERNAME AND SOCKET ID FROM SERVER ', this.username, this.userID);
    });

    this.socket.on('updateQueue', (length) => {
      this.queueSize = length;
      console.log('## ADMIN CHAT - heard that queue was updated to size = ', length);
      console.log('## ADMIN CHAT - queueSize = ', this.queueSize);
    });

    // TODO: listen for connected with and store in local variable
    // when chat is ended, send reponse back to that user
    this.socket.on('connectedWith', (user, id) => {
      this.username = user;
      this.userID = id;
      console.log('Heard ADMIN connected with USER and id = ', this.username, this.userID);
    });

    // end chat

    this.socket.on('ended', () => {
      console.log('ADMIN COMPONENT DISCONNECTED');
      this.chatEnded = true;
      this.socket.disconnect();
      this.handleEndChat();
    });
  }

}

// TODO: 
//
// write:
//
// getUserCredentials(username, socketid)
// recordCredentials(username, socketid)
// endChat(user) emitter
// endChat(user) listener
// getQueueSize()
// updateQueueSize()