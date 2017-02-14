import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import User from './../models/User';
import Pin from './../models/Pin';
import UserService from './../services/UserService';
import PinService from './../services/PinService';


@Component({
    selector: "profile",
    template: `
        <div class="container">

            <div class="row">
                <img class="img-thumbnail col-md-4" [src]="user.profileImageUrl" style="width:190px;"/>
                <div class="col-md-8">
                   <h3>{{user.firstName}} {{user.lastName}} <button class="btn btn-success" *ngIf="!user.doesCurrentUserFollowThisUser" (click)="followUser()">Follow</button><button class="btn btn-outline-success" *ngIf="user.doesCurrentUserFollowThisUser" (click)="unfollowUser()">Unfollow</button></h3>
                </div>
            </div>
            <br>
            <br>
            <div class="row">
                <div class="col-md-2"></div>
                <div class="col-md-8">
                    <h4>This users pins</h4>
                </div>
                <div class="col-md-2"></div>
            </div>
            <div class="row">
                <pin *ngFor="let pin of userPins" [pin]=pin [isEditMode]=false></pin>
            </div>
        </div>
    `
})
export default class ProfileComponent {
    private userService: UserService;
    private pinService: PinService;
    private route: ActivatedRoute;

    private id: number;
    private user: User;
    private userPins: Pin[];
    constructor(route: ActivatedRoute, userService: UserService, pinService: PinService){
        this.route = route;
        this.userService = userService;
        this.pinService = pinService;

        this.id = route.snapshot.params["id"];
        this.user = userService.getUserById(this.id);
        this.userPins = pinService.getPinsOfUser(this.id);
    }

    //Subscribe to id change and refresh data (same route revisited doesnt refresh data)
    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = params['id'];
            this.user = this.userService.getUserById(this.id);
            this.userPins = this.pinService.getPinsOfUser(this.id);
         });
        }
    public followUser(){
        this.userService.followUser(this.user);
    }
    public unfollowUser(){
        this.userService.unfollowUser(this.user);
    }
}