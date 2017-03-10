import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import User from './../models/User';
import Pin from './../models/Pin';
import UserService from './../services/UserService';
import PinService from './../services/PinService';


@Component({
    selector: "profile",
    template: `
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
            <pin *ngFor="let pin of userPins" (likeDeleteEvent)="likeDelete($event)" (commentEvent)="commentEvent($event)" [pin]=pin [isEditMode]=false></pin>
        </div>
    `
})
export default class ProfileComponent {
    private userService: UserService;
    private pinService: PinService;
    private route: ActivatedRoute;

    private id: string;
    private user: User;
    private userPins: Pin[];
    constructor(route: ActivatedRoute, userService: UserService, pinService: PinService){
        this.route = route;
        this.userService = userService;
        this.pinService = pinService;
        this.user = new User("", "", "", "", false);
        this.userPins = [];
    }

    //Subscribe to id change and refresh data (same route revisited doesnt refresh data)
    ngOnInit() {
        this.route.params.subscribe(params => {
            this.userPins = [];
            this.id = params['id'];
            this.userService.getUserById(this.id)
                .subscribe(
                    response => {
                        let user = response.json();
                        this.user = user;
                    },
                    error => console.log("Error when getting user")
                );
            this.pinService.getPinsOfUser(this.id)
                .subscribe(
                data => {
                    let serverItems: Array<any> = data.json();
                    if (serverItems) {
                        serverItems.forEach(it => this.userPins.push(new Pin(it.id, it.imageUrl, it.text, it.title, it.postedOn, it.didCurrentUserLikePin, it.numberOfLikes, it.createdBy, it.comments)));
                    }
                },
                error => console.log("Error when getting My Pins")
                );
         });
    }

    public likeDelete(evt: any) {
        let pin = evt.pin;
        let action = evt.action;
        switch (action) {
            case "like":
                this.pinService.likePin(pin)
                    .subscribe(
                    response => {
                        this.userPins[this.userPins.indexOf(pin)].didCurrentUserLikePin = true;
                        this.userPins[this.userPins.indexOf(pin)].numberOfLikes++;
                    },
                    error => console.log("Error when sending like")
                    );
                break;
            case "unlike":
                this.pinService.unlikePin(pin)
                    .subscribe(
                    response => {
                        this.userPins[this.userPins.indexOf(pin)].didCurrentUserLikePin = false;
                        this.userPins[this.userPins.indexOf(pin)].numberOfLikes--;
                    },
                    error => console.log("Error when sending unlike")
                    );
                break;
            case "delete":
                this.pinService.deletePin(pin)
                    .subscribe(
                    response => {
                        this.userPins.splice(this.userPins.indexOf(pin), 1);
                    },
                    error => console.log("Error when deleting pin")
                    );
                break;
        }
    }

    public commentEvent(evt: any) {
        let action = evt.action;
        let pin = evt.pin;
        switch (action) {
            case "delete":
                let commentId = evt.commentId;
                this.pinService.deleteComment(pin, commentId)
                    .subscribe(
                    response => {
                        this.userPins[this.userPins.indexOf(pin)].comments.splice(this.userPins[this.userPins.indexOf(pin)].comments.indexOf(this.userPins[this.userPins.indexOf(pin)].comments.find(x => x.id == commentId)), 1);
                    },
                    error => console.log("Error when deleting comment Pins")
                    );
                break;
            case "post":
                let text = evt.text;
                this.pinService.postComment(pin, text)
                    .subscribe(
                    response => {
                        let comment = response.json();
                        if (!this.userPins[this.userPins.indexOf(pin)].comments) {
                            this.userPins[this.userPins.indexOf(pin)].comments = [];
                        }
                        this.userPins[this.userPins.indexOf(pin)].comments.push(comment);
                    },
                    error => console.log("Error when posting comment")
                    );
                break;
        }
    }

    public followUser() {
        this.userService.followUser(this.user)
            .subscribe(
            data => {
                this.user.doesCurrentUserFollowThisUser = true;
            },
            error => console.log("Error when following user!")
            );
    }
    public unfollowUser() {
        this.userService.unfollowUser(this.user)
            .subscribe(
            data => {
                this.user.doesCurrentUserFollowThisUser = false;
            },
            error => console.log("Error when unfollowing user!")
            );
    }
}