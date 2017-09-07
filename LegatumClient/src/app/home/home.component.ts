import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../auth.service';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor(
    private authService: AuthService,
    private login: LoginComponent,
    private register: RegisterComponent) {}
  
  //Check to see if user is logged in and if so display logged in features
  checkIfLoggedIn() {
    if (this.authService.isLoggedIn) {
      console.log('Is logged in: true');
        this.isLoggedIn = true;
    } else {
      console.log('User is not logged in');
    }
  }

  ngOnInit() {
    this.checkIfLoggedIn();
  }

  handleLogin(): any {
    this.login.handleLogin();
  }

  handleRegister(): any {
    this.register.registerUser();
  }

}
