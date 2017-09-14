import { Component, OnInit } from '@angular/core';
import { SocketIoModule, SocketIoConfig, Socket } from 'ng-socket-io';

declare var $: any;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  userWantsToChat: boolean;
  chatInitiated: boolean;
  roomAvailable: boolean;
  haveAdminName: boolean;
  haveUsername: boolean;
  userWaiting: boolean;
  chatEnded: boolean;
  socket = io();
  userQueue: Array<any>;
  adminName: string;
  adminID: string;
  username: string;
  userID: string;

  constructor() {
    this.userWantsToChat = false;
    this.chatInitiated = false;
    this.roomAvailable = false;
    this.haveAdminName = false;
    this.haveUsername = false;
    this.userWaiting = false;
    this.chatEnded = false;
    this.adminName = '';
    this.adminID = '';
    this.username = '';
    this.userID = '';
  }

  // materialize
  openChat(): void {
    $('.tap-target').tapTarget('open');
    // $('.tap-target').tapTarget('close');
  }

  // initiate chat
  getAdminCredentials(): void {
    this.socket.emit('getAdminSocketid');
  }

  handleChat(): void {
    if (!this.socket.connected) {
      this.socket.connect();
    }
    this.chatInitiated = true;
    this.haveUsername = false;
    if (this.userWantsToChat) {
      this.userWantsToChat = false;
    } else {
      this.userWantsToChat = true;
    }
  }

  handleChatRequest(): void {
    this.chatEnded = false;
    this.userID = this.socket.id;
    this.username = $('#chat-username').val() || 'user';
    this.haveUsername = true;
    this.socket.emit('userInitiateChat', this.username, this.userID);
  }

  // handle message
  handleSendMessage(): void {
    const message = $('#chat-input').val();
    this.socket.emit('chatMessage', message, this.username);
    $('#chat-input').val('');
  }

  // handle end chat
  endChatWith(user): void {
    this.socket.emit('endChatWithUser', user);
  }

  handleEndChat(): void {
    this.endChatWith('admin');
    this.chatInitiated = false;
    this.roomAvailable = false;
    this.username = '';
    this.userID = '';
    this.chatEnded = true;
    this.socket.emit('ended', this.adminID);
  }

  ngOnInit() {
    // Event listeners
    this.socket.on('adminSocketid', (socketid) => {
      this.socket.emit('ended', socketid);
    });

    // initiate chat
    this.socket.on('waitingForAdmin', (username) => {
      this.userWaiting = true;
    });
    
    this.socket.on('startChatWithUserAndAdmin', (username, userID, adminUsername) => {
      this.adminName = adminUsername;
      this.haveAdminName = true;
      
      if (username === this.username && userID === this.userID) {
        this.roomAvailable = true;
      }
    });

    // handle chat
    this.socket.on('chatMessages', (msg, sender) => {
      $('#chat-messages').append($('<li>').text(msg + ' ~ ' + sender));
    });

    this.socket.on('connectedWith', (user, id) => {
      this.adminName = user;
      this.adminID = id;
    });

    // end chat
    this.socket.on('ended', () => {
      this.socket.disconnect();
      this.handleEndChat();
    });
  }
}
