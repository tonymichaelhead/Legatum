import { Component, Output } from '@angular/core';
import { MnFullpageOptions } from 'ngx-fullpage';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  @Output() public options: MnFullpageOptions = new MnFullpageOptions({
    navigation: true,
    keyboardScrolling: true
  });
  loggedIn = false;
  title = 'Legatum';
}
