import { Component, OnInit, Input } from '@angular/core';
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
      // email = result[0]
      // password = result[1]
      console.log('result = ', result);
      
    }, function (dismiss) {
      if (dismiss === 'cancel') {
        swal({
          title: 'Register',
          confirmButtonText: 'Register',
          showCancelButton: true,
          html:
          '<input type="email" placeholder="email" class="swal2-input">' +
          '<input type="password" placeholder="password" class="swal2-input">' +
          '<input type="text" placeholder="ssn" class="swal2-input">',
        }).then(function (text) {
          if (text) {
            swal(text);
          }
        });
      }
    });
  }
}
