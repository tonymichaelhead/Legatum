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
      const userPassword = result[1];
      const resultObj = context.afAuth.auth.signInWithEmailAndPassword(email, userPassword)
        .catch(error => {
          console.log('Error: user was not authenticated. Need to display a relevent error message.', error);
        });
      // add a realtime listener
      context.afAuth.auth.onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
          console.log(firebaseUser, 'user is logged in!!!!!!!! Now we need to redirect user to dashboard');
          context.authService.login(firebaseUser.email);
        } else {
          console.log('user is not logged in. Now we need to display an error message');
        }
      });
    }, function (dismiss) {
      // 'cancel' in this case refers to the register button
      // going into register function logic
      if (dismiss === 'cancel') {
        context.handleRegister();
      }
    });
  }

  handleRegister(): void {
    this.register.handleRegister();
  }
}
