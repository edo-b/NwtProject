import { Component, Input } from '@angular/core';

import User from './../models/User';
import UserService from './../services/UserService';

@Component({
    selector: "find", 
    template: `
        <div class="container">
            <form class="form-inline">
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" class="form-control" placeholder="Jane Doe">
                </div>
                <button type="submit" class="btn btn-primary">Find profile</button>
            </form>
            <br>
            <br>
            <h2>People you follow</h2>
            <br>
            <div *ngFor="let user of users">
                <div class="row">
                    <img class="img-thumbnail col-md-4" [src]="user.profileImageUrl" style="width:100px;"/>
                    <a class="col-md-8" [routerLink]="'/profile/' + user.id" style="color:black; font-size:20px; text-decoration:none;">{{user.firstName}} {{user.lastName}}</a>
                </div>
                <hr>
            </div>
    `
})
export default class FindUsersComponent {
    private users: User[];
    private userService: UserService;

    constructor(userService: UserService){
        this.userService = userService;
        this.users = this.userService.getFolowedUsers(new User(11, "", "#", ""));
    }
}