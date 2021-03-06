import { Component, Input } from '@angular/core';

import User from './../models/User';
import UserService from './../services/UserService';

@Component({
    selector: "find", 
    template: `
        <div class="form-inline">
            <div class="form-group">
                <label>Name</label>
                <input type="text" class="form-control" placeholder="Jane Doe" (keyup.enter)="searchUsers(searchStringInput)" #searchStringInput>
            </div>
            <button class="btn btn-primary" (click)="searchUsers(searchStringInput)">Find profile</button>
        </div>
        <br>
        <div class="col-md-7">
            <h4>Search results</h4>
            <br>
            <div *ngFor="let user of searchResultUsers">
                <div class="row">
                    <img class="img-thumbnail col-md-4" [src]="user.profileImageUrl" style="width:100px;"/>
                    <a class="col-md-8" [routerLink]="'/profile/' + user.id" style="color:black; font-size:20px; text-decoration:none;">{{user.firstName}} {{user.lastName}}</a>
                    <button class="btn btn-success" *ngIf="!user.doesCurrentUserFollowThisUser" (click)="followUser(user)">Follow</button>
                    <span *ngIf="user.doesCurrentUserFollowThisUser" style="color:green;"><img src="https://cdn4.iconfinder.com/data/icons/web-ui-color/128/Checkmark-16.png" style="margin-bottom:5px;"/> Followed</span>
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
    `
})
export default class FindUsersComponent {
    private followedUsers: User[];
    private searchResultUsers: User[];
    private userService: UserService;

    constructor(userService: UserService){
        this.userService = userService;
        this.followedUsers = [];
        this.searchResultUsers = [];
        this.userService.getFolowedUsers()
                        .subscribe(
                            data => {
                                let serverItems: Array<any> = data.json();
                                if (serverItems) {
                                    serverItems.forEach(it => this.followedUsers.push(new User(it.id, it.firstName, it.lastName, it.profileImageUrl, it.doesCurrentUserFollowThisUser)));
                                }
                            },
                            error => console.log("Error when getting followed users")
                            );
        this.userService.getAllUsers()
                        .subscribe(
                        data => {
                            let serverItems: Array<any> = data.json();
                            if (serverItems) {
                                serverItems.forEach(it => this.searchResultUsers.push(new User(it.id, it.firstName, it.lastName, it.profileImageUrl, it.doesCurrentUserFollowThisUser)));
                            }
                        },
                        error => console.log("Error when getting all users")
                        );
    }

    public followUser(user: User){
        this.userService.followUser(user)
                        .subscribe(
                            data => {
                                user.doesCurrentUserFollowThisUser = true;
                            },
                            error => console.log("Error when following user!")
                        );
    }
    public unfollowUser(user: User){
        this.userService.unfollowUser(user)
                        .subscribe(
                            data => {
                                user.doesCurrentUserFollowThisUser = false;
                            },
                            error => console.log("Error when unfollowing user!")
                        );
    }
    public searchUsers(searchStringInput: HTMLInputElement){
        if(searchStringInput.value != "")
        {
            this.userService.getUsersBySearchString(searchStringInput.value)
                            .subscribe(
                                data => {
                                            this.searchResultUsers = [];
                                            let serverItems: Array<any> = data.json();
                                            if (serverItems) {
                                                serverItems.forEach(it => this.searchResultUsers.push(new User(it.id, it.firstName, it.lastName, it.profileImageUrl, it.doesCurrentUserFollowThisUser)));
                                            }
                                },
                                error => {
                                    console.log("Error when getting all users");
                                    this.searchResultUsers = [];
                                }
                            );
            searchStringInput.value = "";
        }
    }
}