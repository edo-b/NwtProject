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
            <div class="col-md-7">
                <h4>Search results</h4>
                <br>
                <div *ngFor="let user of searchResultUsers">
                    <div class="row">
                        <img class="img-thumbnail col-md-4" [src]="user.profileImageUrl" style="width:100px;"/>
                        <a class="col-md-8" [routerLink]="'/profile/' + user.id" style="color:black; font-size:20px; text-decoration:none;">{{user.firstName}} {{user.lastName}}</a>
                        <button class="btn btn-success">Follow</button>
                    </div>
                    <hr>
                </div>
            </div>

            <div class="col-md-5">
                <h4>People you follow</h4>
                <br>
                <div class="pre-scrollable">
                    <div *ngFor="let user of followedUsers">
                        <div class="row">
                            <img class="img-thumbnail col-md-4" [src]="user.profileImageUrl" style="width:100px;"/>
                            <a class="col-md-8" [routerLink]="'/profile/' + user.id" style="color:black; font-size:20px; text-decoration:none;">{{user.firstName}} {{user.lastName}}</a>
                        </div>
                        <hr>
                    </div>
                </div>
            </div>
    `
})
export default class FindUsersComponent {
    private followedUsers: User[];
    private searchResultUsers: User[];
    private userService: UserService;

    constructor(userService: UserService){
        this.userService = userService;
        this.followedUsers = this.userService.getFolowedUsers();
        this.searchResultUsers = this.userService.getUsersBySearchString("Test");//Hardkoooooood
    }
}