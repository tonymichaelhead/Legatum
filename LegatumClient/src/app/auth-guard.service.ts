import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private afAuth: AngularFireAuth) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    console.log('canActivate was fired from AuthGaurdService');

    let url: string = state.url;

    return this.checkLogin(url);
  }

  checkLogin(url: string): Promise<any> {
    let isLoggedIn;
    return new Promise((resolve, reject) => {
      isLoggedIn = this.afAuth.auth.onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
          resolve(true);
        } else {
          // Store attempted URL for redirecting
          this.authService.redirectUrl = url;
          // Navigate to the home page with extras
          this.router.navigate(['/home']);
          reject(false);
        }
      });
    })
      .then((res) => {
        if (res) {
          return true;
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.log('Error: inside is logged in', err);
      });
  }
}

