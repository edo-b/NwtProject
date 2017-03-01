import { Component, Input } from '@angular/core';

import User from './../models/User';
import UserService from './../services/UserService';

@Component({
    selector: "update-profile",
    template: `
        <h1>Update profile</h1>
        <hr>
        <br>
        <div class="row">
            <img class="img-thumbnail col-md-4" [src]="currentUser.profileImageUrl" style="width:200px;"/>
            <div class="col-md-8">
                <form>
                    <div class="form-group">
                        <label>Email address</label>
                        <input type="email" class="form-control" [value]="currentUserEmail" placeholder="Enter email">
                    </div>
                    <div class="form-group">
                        <label>New password</label>
                        <input type="password" class="form-control" placeholder="Password">
                    </div>
                    <div class="form-group">
                        <label>First name</label>
                        <input type="text" class="form-control" [value]="currentUser.firstName" placeholder="Enter email">
                    </div>
                    <div class="form-group">
                        <label>Last name</label>
                        <input type="text" class="form-control" [value]="currentUser.lastName" placeholder="Enter email">
                    </div>
                    <button class="btn btn-primary">Update profile</button>
                    <a class="btn btn-danger" routerLink="/home">Cancel</a>
                </form>
            </div>
        </div>
    `
})
export default class ProfileComponent {
    private currentUser: User;
    private userService: UserService;
    //Maybe new model for this???
    private currentUserEmail: string;

    constructor(userService: UserService){
        //this.userService = userService;
        //this.currentUser = this.userService.getCurrentUser();
        //this.currentUserEmail = this.userService.getCurrentUserEMail();
    }
}