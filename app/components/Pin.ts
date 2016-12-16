import { Component, Input } from '@angular/core';
import Pin from './../models/Pin';

@Component({
    selector: "pin", 
    template: `
        <div class="row">
                <div class="col-md-2"></div>
                <div class="card col-md-8">
                    <div class="card-block">
                        <button id="delete-card-button" class="btn btn-sm btn-danger" *ngIf="isEditMode">X</button>
                        <h4 class="card-title"><a href="sample_profile.html" style="color:#686868;">Hardcoded username{{usernameOfCreator}}</a></h4>
                    </div>
                    <img class="card-img-top" [src]="pin.imageUrl" style="width:100%; margin-top:10px;" alt="Card image cap">
                    <div class="card-block">
                        <h4 class="card-title">{{pin.title}}</h4>
                        <p class="card-text">{{pin.text}}</p>
                        <button class="btn btn-sm btn-primary" *ngIf="!pin.didCurrentUserLikePin">Like</button>
                        <button class="btn btn-sm btn-outline-primary" *ngIf="pin.didCurrentUserLikePin">Unlike</button>
                        <b>{{pin.numberOfLikes}}</b> Likes
                        <p class="card-text">
                            <small class="text-muted">Posted: {{pin.date}}</small>
                        </p>
                    </div>
                    <div class="card-block">
                        <h5>Comments:</h5>
                        <div *ngFor="let comment of pin.comments">
                            <hr>
                            <b><a href="sample_profile.html" style="color:#686868;">John Doe</a></b>: 
                            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit </span>
                            <span style="cursor:pointer;" *ngIf="isEditMode">&times;</span>
                        </div>
                        <br>
                        <form class="form-inline">
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Your comment">
                            </div>
                            <button type="submit" class="btn btn-outline-primary">Post comment</button>
                        </form>
                    </div>
                </div>
                <div class="col-md-2"></div>
            </div>
            <br>
    `
})
export default class PinComponent{
    @Input() 
    public pin: Pin;
    @Input()
    public usernameOfCreator: string;
    @Input()
    public isEditMode: boolean;
}