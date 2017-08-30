import { Component, OnInit } from '@angular/core';

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

  handleLogin(): void {
    console.log('clicked');
    swal({
      title: 'Login',
      html:
      '<input type="email" placeholder="email" id="swal-input1" class="swal2-input">' +
      '<input type="password" placeholder="password" id="swal-input2" class="swal2-input">',
    });
  }
}
