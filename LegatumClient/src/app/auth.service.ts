import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

console.log('authService runs!');

@Injectable()
export class AuthService {
  isLoggedIn = false;
  email = '';

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  // For storing URL for redirection after logging in
  redirectUrl: string;

  checkIfLoggedIn() {
    // this.afAuth.auth.onAuthStateChanged( firebaseUser => {
    //   if (firebaseUser) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // });
  }

  // login(): Observable<boolean> {
  login(email: string): void {
  console.log('AuthService was called');
    // return Observable.of(true).delay(1000).do(val => this.isLoggedIn = true);
    this.isLoggedIn = true;
    this.email = email;
    this.router.navigateByUrl('dashboard/my-contracts');
    // this.router.navigateByUrl('dashboard/' + this.email + '/my-contracts');
  }

  logout(): void {
    this.isLoggedIn = false;
    this.afAuth.auth.signOut();
    console.log('user was successfully logged out');
  }
}
