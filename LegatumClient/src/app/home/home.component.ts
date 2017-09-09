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
  myStyle: object = {};
  myParams: object = {};
  width: number = 100;
  height: number = 100;

  constructor(
    private authService: AuthService,
    private login: LoginComponent,
    private register: RegisterComponent) { }

  // Check to see if user is logged in and if so display logged in features
  checkIfLoggedIn() {
    if (this.authService.isLoggedIn) {
      console.log('Is logged in: true');
      this.isLoggedIn = true;
    } else {
      console.log('User is not logged in');
    }
  }

  handleLogin(): any {
    this.login.handleLogin();
  }

  handleRegister(): any {
    this.register.registerUser();
  }

  ngOnInit() {
    this.checkIfLoggedIn();
    this.myStyle = {
      'position': 'fixed',
      'width': '100%',
      'height': '100%',
      'z-index': -1,
      'top': 0,
      'left': 0,
      'right': 0,
      'bottom': 0,
    };
    this.myParams = {
      particles: {
        number: {
          'value': 100,
          'density': {
            'enable': true,
            'value_area': 1000
          }
        },
        color: {
          'value': '#ffb3ff'
        },
        shape: {
          'type': 'circle',
          'stroke': {
            'width': 0,
            'color': '#ffb3ff'
          },
          'polygon': {
            'nb_sides': 5
          },
          'image': {
            'src': 'img/github.svg',
            'width': 100,
            'height': 100
          }
        },
        opacity: {
          'value': 0.5,
          'random': false,
          'anim': {
            'enable': false,
            'speed': 1,
            'opacity_min': 0.1,
            'sync': false
          }
        },
        size: {
          'value': 3,
          'random': true,
          'anim': {
            'enable': false,
            'speed': 40,
            'size_min': 0.1,
            'sync': false
          }
        },
        line_linked: {
          'enable': true,
          'distance': 200,
          'color': '#ffb3ff',
          'opacity': 0.4,
          'width': 1
        },
        move: {
          'enable': true,
          'speed': 3,
          'direction': 'none',
          'random': false,
          'straight': false,
          'out_mode': 'out',
          'attract': {
            'enable': false,
            'rotateX': 600,
            'rotateY': 1200
          }
        }
      },
      interactivity: {
        'detect_on': 'canvas',
        'events': {
          'onhover': {
            'enable': true,
            'mode': 'push'
          },
          onclick: {
            'enable': true,
            'mode': 'push'
          },
          'resize': true
        },
        modes: {
          'grab': {
            'distance': 150,
            'line_linked': {
              'opacity': 1
            }
          },
          bubble: {
            'distance': 400,
            'size': 40,
            'duration': 2,
            'opacity': 8,
            'speed': 3
          },
          repulse: {
            'distance': 200
          },
          push: {
            'particles_nb': 4
          },
          remove: {
            'particles_nb': 2
          }
        }
      },
      retina_detect: true,
      config_demo: {
        'hide_card': false,
        'background_color': '#b61924',
        'background_image': '',
        'background_position': '50% 50%',
        'background_repeat': 'no-repeat',
        'background_size': 'cover'
      }
    };
  }


}
