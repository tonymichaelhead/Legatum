import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { AngularFireAuth } from 'angularfire2/auth';
import { Account } from '../models/account/account.interface';
import { NgModel, FormsModule } from '@angular/forms';

declare var swal: any;
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public email: string;
  @Output() loginStatus: EventEmitter<any>;

  constructor(private afAuth: AngularFireAuth) {}

  ngOnInit() {
    console.log('jQuery body', $('body'));
  }

  handleRegister(): void {
    console.log('register');
    swal('register user was clicked!');
  }

  handleLogin(): void {
    const context = this;
    console.log('clicked');
    swal({
      title: 'Login',
      confirmButtonText: 'Login',
      showCancelButton: true,
      cancelButtonText: 'Register',
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
      }
    }).then(function (result) {
      // authenticate user with stored data passed to the result variable
      const userEmail = result[0];
      const userPassword = result[1];
      const resultObj = context.afAuth.auth.signInWithEmailAndPassword(userEmail, userPassword)
        .then(data => console.log(data, 'success for reals'))
        .catch(error => console.log(error, 'error occurred'));
      console.log('resultObj = ', resultObj);
      console.log('success!!!');
    }, function (dismiss) {
      // 'cancel' in this case refers to the register button
      if (dismiss === 'cancel') {
        swal({
          title: 'Register',
          confirmButtonText: 'Register',
          showCancelButton: true,
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
          }
        }).then(function (result2) {
          console.log('result2 = ', result2);
          const userEmail2 = result2[0];
          const userPassword2 = result2[1];
          const resultObj2 = context.afAuth.auth.createUserWithEmailAndPassword(userEmail2, userPassword2)
            .then(success => console.log(success, 'Success registering user'))
            .catch(error => console.log(error, 'error occurred'));
        });
      }
    });
  }
}
