import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

declare var swal: any;
declare var $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private afAuth: AngularFireAuth) {}


  ngOnInit() {
  }

  displayRegisterSuccess(user): void {
    const context = this;
    swal({
      title: 'Success!',
      text: user + 'has registered successfully, please login.',
      confirmButtonText: 'OK',
      confirmButtonColor: '#830083',
      confirmButtonClass: 'msg-btn',
      background: '',
      customClass: 'msg-reg-success',
    });
  }

  displayRegisterError(): void {
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
      context.registerUser();
    });
  }

  registerUser(): void {
    const context = this;
    swal({
      title: 'REGISTER',
      confirmButtonText: 'REGISTER',
      confirmButtonColor: '#830083',
      confirmButtonClass: 'register-btn',
      reverseButtons: true,
      showCancelButton: true,
      cancelButtonColor: 'transparent',
      cancelButtonText: 'CANCEL',
      cancelButtonClass: 'cancel-btn',
      customClass: 'register-popup',
      background: '',
      html:
      '<input id="register-email" type="email" placeholder="email" class="swal2-input">' +
      '<input id="register-password" type="password" placeholder="password" class="swal2-input">',
      preConfirm: function () {
        return new Promise(function (resolve) {
          resolve([
            $('#register-email').val(),
            $('#register-password').val()
          ]);
        });
      },
      onOpen: function () {
        $('#register-email').focus();
      }
    }).then(function (result) {
      console.log('RESULT from registering user', result);
      const userEmail = result[0];
      const userPassword = result[1];
      const resultObj = context.afAuth.auth.createUserWithEmailAndPassword(userEmail, userPassword)
        .then(success => {
          context.displayRegisterSuccess(userEmail);
        })
        .catch(error => {
          context.displayRegisterError();
        });
    });
  }

}
