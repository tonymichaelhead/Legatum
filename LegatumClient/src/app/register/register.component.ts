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

  constructor(private afAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  handleRegister(): void {
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
    }).then(function (result2) {
      const userEmail2 = result2[0];
      const userPassword2 = result2[1];
      const resultObj2 = context.afAuth.auth.createUserWithEmailAndPassword(userEmail2, userPassword2)
        .then(success => {
          console.log(success, 'Success registering user. Now we need to display success message and redirect to login');
        })
        .catch(error => {
          console.log(error, 'error occurred. Now we need to display error message.');
        });
    });
  }

}
