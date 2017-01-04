import { Component } from '@angular/core';

import PinService from './services/PinService';
import UserService from './services/UserService';

@Component({
  selector: 'my-app',
  template: `
        <nav class="navbar navbar-dark bg-inverse navbar-static-top">
            <a class="navbar-brand" routerLink="/home">NwtApp</a>
            <ul class="nav navbar-nav">
                <li class="nav-item">
                  <a class="nav-link" routerLink="/home" routerLinkActive="active">Home</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" routerLink="/pins" routerLinkActive="active">My pins</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" routerLink="/find" routerLinkActive="active">Find people</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" routerLink="/profile" routerLinkActive="active">Sample profile</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" routerLink="/update-profile" routerLinkActive="active">Update profile</a>
                </li>
            </ul>
            <form class="form-inline float-xs-right">
                <a routerLink="/register"><button type="button" class="btn btn-outline-success">Register</button></a>
                <a routerLink="/login"><button type="button" class="btn btn-outline-info">Login</button></a>
            </form>
        </nav>

        <router-outlet></router-outlet>
      `,
      providers: [PinService, UserService]
})
export class AppComponent { 
  
}
