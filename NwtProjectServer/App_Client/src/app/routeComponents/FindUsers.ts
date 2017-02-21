import { Component, Input } from '@angular/core';

import User from './../models/User';
import UserService from './../services/UserService';

@Component({
    selector: "find", 
    template: `
        <div class="form-inline">
            <div class="form-group">
                <label>Name</label>
                <input type="text" class="form-control" placeholder="Jane Doe" #searchStringInput>
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
                    <i class="glyphicon glyphicon-ok" style="color: green; font-size: 18pt;"></i>
                    <span *ngIf="user.doesCurrentUserFollowThisUser" style="color:green;"><i class="fa fa-check-circle-o" style="font-size:18px;"></i> Followed</span>
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
        this.followedUsers = this.userService.getFolowedUsers();
        this.searchResultUsers = this.userService.getUsersBySearchString("A");//Hardkoooooood
    }

    public followUser(user: User){
        this.userService.followUser(user);
    }
    public unfollowUser(user: User){
        this.userService.unfollowUser(user);
    }
    public searchUsers(searchStringInput: HTMLInputElement){
        if(searchStringInput.value == "")
        {
            this.searchResultUsers = this.userService.getUsersBySearchString(searchStringInput.value);
            searchStringInput.value = "";
        }
    }
}