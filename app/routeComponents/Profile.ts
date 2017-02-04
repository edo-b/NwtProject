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
                   <h3>{{user.firstName}} {{user.lastName}} <button class="btn btn-outline-success">Follow</button></h3>
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
                <pin *ngFor="let pin of userPins" [pin]=pin [isEditMode]=false [usernameOfCreator]=""></pin>
            </div>
        </div>
    `
})
export default class ProfileComponent {
    private userService: UserService;
    private PinService: PinService;

    private id: number;
    private user: User;
    private userPins: Pin[];
    constructor(router: ActivatedRoute, userService: UserService, pinService: PinService){
        this.id = router.snapshot.params["id"];
        this.user = userService.getUserById(this.id);
        this.userPins = pinService.getPinsOfUser(this.id);
    }
}