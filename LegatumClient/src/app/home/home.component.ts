import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';

declare var swal: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  handleRegister(): void {
    console.log('register');
    swal('register user was clicked!');
  }

  handleLogin(): void {
    console.log('clicked');
    swal({
      title: 'Login',
      confirmButtonText: 'Login',
      showCancelButton: true,
      cancelButtonText: 'Register',
      html:
      '<input type="email" placeholder="email" class="swal2-input">' +
      '<input type="password" placeholder="password" class="swal2-input">',
    }).then(function () {
      console.log('login has been pressed');
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
        });
      }
    });
  }
}
