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
      // authenticate user with stored data passed to the result variable
      const email = result[0];
      const password = result[1];
      const resultObj = context.afAuth.auth.signInWithEmailAndPassword(email, password)
        .catch(error => {
          context.displayLoginError();
        });
      // add a realtime listener
      context.afAuth.auth.onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
          context.authService.login(firebaseUser.email);
        }
      });
    }, function (dismiss) {
      // 'cancel' in this case refers to the register button
      if (dismiss === 'cancel') {
        context.handleRegister();
      }
    });
  }
}
