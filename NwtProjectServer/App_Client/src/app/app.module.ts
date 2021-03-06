import { NgModule }  from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent }   from './app.component';

import Home from './routeComponents/Home';
import Profile from './routeComponents/Profile';
import FindUsers from './routeComponents/FindUsers';
import PageNotFound from './routeComponents/PageNotFound';
import MyPins from './routeComponents/MyPins';

import Pin from './components/Pin';

@NgModule({
  imports:      [ 
    BrowserModule, 
    NgbModule.forRoot(),
    HttpModule,
    JsonpModule,
    RouterModule.forRoot([
      { path: '', component: Home },
      { path: 'home', component: Home },
      { path: 'profile/:id', component: Profile },
      { path: 'pins', component: MyPins },
      { path: 'find', component: FindUsers },
      { path: '**', component: PageNotFound }
    ], { useHash: true })
  ],
  declarations: [ AppComponent, Home, PageNotFound, Profile, FindUsers, MyPins, Pin],
  providers: [],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
