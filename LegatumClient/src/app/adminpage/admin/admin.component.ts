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

  getUserCredentials(): void {
    this.socket.emit('getUserSocketid');
    this.socket.emit('getUsername');
  }

  handleChatRequest(): void {
    this.chatInitiated = true;
    this.haveUsername = false;
    if (!this.socket.connected) {
      this.socket.connect();
    }
  }

  handleAdminAccept(): void {
    this.haveUsername = true;
    this.adminName = $('#chat-username').val() || 'admin';
    this.adminID = this.socket.id;
    console.log('admin id is ', this.adminID);
    this.socket.emit('adminAcceptChat', this.adminName, this.adminID);
    this.roomAvailable = true;
  }

  // handle chat
  handleSendMessage(): void {
    const message = $('#chat-input').val();
    this.socket.emit('chatMessage', message, this.adminName);
    $('#chat-input').val('');
    console.log('ADMIN sending message of', message);
  }

  // end chat
  handleEndChat(): void {
    this.getUserCredentials();
    this.chatInitiated = false;
    this.roomAvailable = false;
    this.username = '';
    this.userID = '';
    this.chatEnded = true;
    this.haveUsername = false;
    this.socket.emit('ended', this.userID);
  }

  ngOnInit() {
    this.getQueueSize();

    // Event Listeners
    this.socket.on('username', (username) => {
      this.username = username;
    });

    this.socket.on('chatMessagesAdmin', (msg, sender) => {
      $('#chat-messages-admin').append($('<li>').text(msg + ' ~ ' + sender));
      console.log('Admin recvd msg ' + msg + ' from sender ' + sender);
    });

    this.socket.on('userSocketid', (socketid) => {
      this.socket.emit('ended', socketid);
      this.getQueueSize();
    });

    this.socket.on('firstInLine', (username, socketid) => {
      this.username = username;
      this.userID = socketid;
      this.haveUsername = true;
    });

    this.socket.on('updateQueue', (length) => {
      this.queueSize = length;
    });

    this.socket.on('connectedWith', (user, id) => {
      this.username = user;
      this.userID = id;
    });

    // end chat
    this.socket.on('ended', () => {
      this.chatEnded = true;
      this.socket.disconnect();
      this.handleEndChat();
    });
  }

}