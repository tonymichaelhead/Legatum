import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../auth.service';
import { RegisterComponent } from '../register/register.component';

declare var swal: any;
declare var $: any;
declare var firebase: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private afAuth: AngularFireAuth, private authService: AuthService, private register: RegisterComponent) { }

  ngOnInit() {
  }

  displayLoginError(): void {
    const context = this;
    swal({
      title: 'Please try again.',
      text: 'An error has occurred, please try your email and password again.',
      confirmButtonText: 'Retry',
      confirmButtonColor: '#830083',
      confirmButtonClass: 'msg-btn',
      background: '',
      customClass: 'msg-reg-fail',
    }).then(function() {
      context.handleLogin();
    });
  }

  handleRegister(): void {
    this.register.registerUser();
  }

  handleLogin(): void {
    const context = this;
    swal({
      title: 'LOGIN',
      confirmButtonText: 'LOGIN',
      confirmButtonColor: '#830083',
      confirmButtonClass: 'login-btn',
      reverseButtons: true,
      showCancelButton: true,
      cancelButtonColor: 'transparent',
      cancelButtonText: 'REGISTER',
      cancelButtonClass: 'register-btn',
      allowEnterKey: true,
      customClass: 'login-popup',
      background: '',
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
      onOpen: function () {
        $('#email').focus();
      }
    }).then(function (result) {
      console.log('RESULT from logging in user', result);
      const email = result[0];
      const password = result[1];
      const resultObj = context.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(function() {
          context.afAuth.auth.onAuthStateChanged(firebaseUser => {
            if (firebaseUser) {
              context.authService.login(firebaseUser.email);
            }
          });
        }).catch(function() {
          context.displayLoginError();
        });
    }, function (dismiss) {
      // 'cancel' in this case refers to the register button
      if (dismiss === 'cancel') {
        context.handleRegister();
      }
    });
  }
}
