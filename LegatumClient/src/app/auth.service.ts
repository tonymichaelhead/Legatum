import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

@Injectable()
export class AuthService {
  isLoggedIn = false;

  //For storing URL for redirection after logging in
  redirectUrl: string;

  login(): Observable<boolean> {
    console.log('AuthService was called')
    return Observable.of(true).delay(1000).do(val => this.isLoggedIn = true);
  
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}
console.log('AuthService runs!!')
