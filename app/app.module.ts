import { NgModule }  from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent }   from './app.component';

import Home from './routeComponents/Home';
import Profile from './routeComponents/Profile';
import UpdateProfile from './routeComponents/UpdateProfile';
import FindUsers from './routeComponents/FindUsers';
import PageNotFound from './routeComponents/PageNotFound';
import Login from './routeComponents/Login';
import Register from './routeComponents/Register';
import MyPins from './routeComponents/MyPins';

import Pin from './components/Pin';

@NgModule({
  imports:      [ 
    BrowserModule, 
    NgbModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: Home },
      { path: 'home', component: Home },
      { path: 'update-profile', component: UpdateProfile },
      { path: 'profile/:id', component: Profile },
      { path: 'pins', component: MyPins },
      { path: 'find', component: FindUsers },
      { path: 'login', component: Login },
      { path: 'register', component: Register },
      { path: '**', component: PageNotFound }
    ])
  ],
  declarations: [ AppComponent, Home, PageNotFound, Profile, UpdateProfile, FindUsers, Login, Register, MyPins, Pin],
  providers: [],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
