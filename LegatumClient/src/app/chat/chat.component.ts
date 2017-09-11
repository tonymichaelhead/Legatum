import { Component, OnInit } from '@angular/core';
import { Socket } from 'ng-socket-io';

declare var $: any;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  haveUsername: boolean;
  roomAvailable: boolean;
  username: string;
  socket = io();
  userQueue: Array<any>;
  userWaiting: boolean;
  userID: string;
  chatEnded: boolean;
  chatInitiated: boolean;
  userWantsToChat: boolean;

  constructor() {
    this.roomAvailable = false;
    this.haveUsername = false;
    this.username = '';
    this.userWaiting = false;
    this.userID = '';
    this.chatEnded = false;
    this.chatInitiated = false;
    this.userWantsToChat = false;
  }

  handleChat(): void {
    if (!this.socket.connected) {
      this.socket.connect();
    }
    console.log('#1 Home Comp: User has clicked the chat button');
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
    console.log('#2 - CHAT CLIENT: user has initiated chat');
    console.log('#2.1.1 - CHAT CLIENT: this.socket.id = ', this.socket.id);
    console.log('#2.1.2 - CHAT CLIENT: this.userID and this.username = ', this.userID, this.username);
    this.userID = this.socket.id;
    this.username = $('#chat-username').val() || 'user';

    // toggle haveUserName
    this.haveUsername = true;

    // fire off user initiated chat
    console.log('#2.1.3 - CHAT CLIENT: firing off message to server userInitiatedChat. username =  ', this.username);
    this.socket.emit('userInitiateChat', this.username);
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

  ngOnInit() {
    // Chat Listeners

    // listen for new message & display it
    this.socket.on('chatMessages', (msg) => {
      $('#chat-messages').append($('<li>').text(msg));
    });

    // listen for user waiting
    this.socket.on('waitingForAdmin', (username) => {
      console.log('#4.0 - CHAT CLIENT: this inside ngOnInit listeners = ', this);
      console.log('#4.1 - CHAT CLIENT: heard waitingForAdmin from server and username = ', username);
      console.log('#4.1 - CHAT CLIENT: left off here ***************************************');
      
      // toggle indicator on admin panel to show user is waiting
      // TODO: use this to display waiting message if needed
      console.log('#4.2 - CHAT CLIENT: this.userWaiting = ', this.userWaiting);
      this.userWaiting = true;
    });

    // listen for start chat with user and admin
    this.socket.on('startChatWithUserAndAdmin', (username, userID) => {
      console.log('#6 - CHAT CLIENT: heard startChatWithUserAndAdmin from server');
      console.log('#6.1 - CHAT CLIENT: usernamed recvd = ', username);
      // console.log('#6.2 - CHAT CLIENT: adminUsername recvd = ', adminUsername);
      
      // start the chat with user and admin
      if (username === this.username && userID === this.userID) {
        // display room to both user and admin
        console.log('#6.2 - CHAT CLIENT: SUCCESS username matches this.username');
        console.log('#6.2.1 - CHAT CLIENT: this.roomAvailable = ', this.roomAvailable);
        console.log('#6.2.2 - CHAT CLIENT: this = ', this);
        this.roomAvailable = true;
      } else {
        console.log('#6.3 - CHAT CLIENT: ERROR username does not match this.username');
        console.log('#6.4 - CHAT CLIENT: username & this.username = ', username, this.username);
        console.log('#6.5 - CHAT CLIENT: userID & this.userID = ', userID, this.userID);
      }
    });

    // Listen for disconnected
    // this.socket.on('ended', () => {
    //   this.username = '';
    //   this.userID = '';
    //   // this.roomAvailable = false;
    //   this.chatEnded = true;
    //   // this.haveUserName = false;
    //   console.log('##CHAT CLIENT: disconnected heard from server');
    // });
  }

}

/*
user initiates a chat
inputs username
waits for support desk to respond on the other side
  displays a waiting message
user then gets added to chat room with support desk
  displays initial message saying who the support desk is (username)
can chat....
has option to end chat any time.

admin gets notification that there is a chat waiting to be responded to
admin selects to join chat with one other user
input username to display to user on the other side
can chat....
has option to end chat any time.
*/

/*
General **********
will have to find a way to differentiate users from admins (db) (firebase)

should be a button on the admin page that blinks or turns a color to indicate 
  that a user is waiting
should be able to click button to connect to chat room with user

admin should not be able to initiate a chat -> pointless
only accept

Once both an admin and a user is ready to connect -> start chat

button on home page to initiate a chat
then ask the user for username
then display wait message
*/

/*
user *************
 to: Server: emit ('userInitiateChat', username)







user / admin *****
 from: Server: listen for 'startChatWithUserAndAdmin'
  {
    start the chat between admin and user
      display chat room to user
      display chat room to admin
  }

  function to emit ('disconnect') 
  {
    disconnect both users
    close chat room for both users
    display thank you message to user
    display something to admin
  }




admin ************
  listen for 'userWaiting'
  {
    toggle indicator on admin panel to reflect that a user is waiting
  }

  admin clicks accept chat button
    emit 'adminAcceptChat', adminUsername to server
*/

/*
OLD CODE --------

 handleAddUser(): void {
    console.log('CLIENT: add user clicked');
    this.socket.emit('addUser', $('#chat-username').val());
    this.username = $('#chat-username').val() || 'User';
    this.haveUserName = true;
    // route to chatroom or waiting queue
    // get users
    // this.users.push(this.username);
    // TODO: get length of users object from server
    if (this.numberOfUsers >= 2) {
      this.roomAvailable = false;
      // TODO: pass in user to this function
      this.queue.push(this.username);
      console.log('CLIENT: rooms are full, adding to queue');
      console.log('CLIENT: num of users waiting = ', this.queue.length);

    } else {
      console.log('CLIENT: number of users = ', this.numberOfUsers);
      console.log('CLIENT: vacancy');
      // console.log('CLIENT: num of users = ', this.users.length);
      // console.log('CLIENT: users = ', this.users);
      this.roomAvailable = true;
      // this.users.push(this.username);
      // TODO: this.startChat();
      this.startChat();
    }
  }


  startChat(): void {
    console.log('CLIENT: start chat');
    this.socket.emit('start chat');
  }

  endChat(): void {
    console.log('CLIENT: end chat');
    this.socket.emit('end chat');
  }

this.socket.on('numOfUsers', function(numUsers) {
      console.log('CLIENT: number of users coming from server = ', numUsers);
      this.numberOfUsers = numUsers;
    });

    // 
    this.socket.on('chat started', function() {
      // add users to rooms
    });

    this.socket.on('chat ended', function() {
      // remove user from users, and add users from queue if any
    });

*/