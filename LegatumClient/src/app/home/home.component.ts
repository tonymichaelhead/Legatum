import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { AngularFireAuth } from 'angularfire2/auth';
import { Account } from '../models/account/account.interface';
import { NgModel, FormsModule } from '@angular/forms';
import { AppComponent } from '../../app/app.component';
import { AngularFireModule } from 'angularfire2';

declare var swal: any;
declare var $: any;
declare var firebase: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public email: string;
  @Output() loginStatus: EventEmitter<any>;

  constructor(private afAuth: AngularFireAuth) {
    this.loginStatus = new EventEmitter<any>();
  }

  handleRegister(): void {
    console.log('register');
    swal('register user was clicked!');
  }
  ngOnInit() {}

  handleLogin(): void {
    const context = this;
    swal({
      title: 'Login',
      confirmButtonText: 'Login',
      showCancelButton: true,
      cancelButtonText: 'Register',
      allowEnterKey: true,
      html:
        '<input id="email" type="email" placeholder="email" class="swal2-input">' +
        '<input id="password" type="password" placeholder="password" class="swal2-input">',
      preConfirm: function () {
        return new Promise(function (resolve) {
          resolve([
            $('#email').val(),
            $('#password').val()
          ]);
        });
      },
      onOpen: function() {
        $('#email').focus();
      }
    }).then(function (result) {
      // authenticate user with stored data passed to the result variable
      const email = result[0];
      const userPassword = result[1];
      // TODO: handle user login
      const resultObj = context.afAuth.auth.signInWithEmailAndPassword(email, userPassword)
        // .then(data => {
        //   console.log('User successfully authenticated!', data);
        //   // context.loginStatus.emit(data);
        // })
        .catch(error => {
          console.log('Error: user was not authenticated', error);
          // this.loginStatus.emit(error);
        });
        // add a realtime listener
        // TODO: might have to remove the .then statements
        context.afAuth.auth.onAuthStateChanged(firebaseUser => {
          if (firebaseUser) {
            console.log('user exists!!!!!!!!');
          } else {
            console.log('user does not exist.');
          }
        });

      // console.log('resultObj = ', resultObj);
    }, function (dismiss) {
      // 'cancel' in this case refers to the register button
      // going into register function logic
      if (dismiss === 'cancel') {
        swal({
          title: 'Register',
          confirmButtonText: 'Register',
          showCancelButton: true,
          html:
            '<input id="register-email" type="email" placeholder="desired email" class="swal2-input">' +
            '<input id="register-password" type="password" placeholder="password" class="swal2-input">',
          preConfirm: function () {
            return new Promise(function (resolve) {
              resolve([
                $('#register-email').val(),
                $('#register-password').val()
              ]);
            });
          }
        }).then(function (result2) {
          // TODO: redirect user to login page
          // display error message if can't register
          // console.log('result2 = ', result2);
          const userEmail2 = result2[0];
          const userPassword2 = result2[1];
          // TODO: handle user registration
          const resultObj2 = context.afAuth.auth.createUserWithEmailAndPassword(userEmail2, userPassword2)
            .then(success => {
              console.log(success, 'Success registering user');
            })
            .catch(error => {
              console.log(error, 'error occurred');
            });
        });
      }
    });
  }

  

}
