import { Component, Input } from '@angular/core';

import Pin from './../models/Pin';
import PinService from './../services/PinService';

@Component({
    selector: "pin", 
    template: `
        <div class="row">
                <div class="col-md-2"></div>
                <div class="card col-md-8">
                    <div class="card-block">
                        <button id="delete-card-button" class="btn btn-sm btn-danger" *ngIf="isEditMode" (click)="deletePin()">X</button>
                        <h4 class="card-title"><a [routerLink]="'/profile/' + pin.createdBy.id" style="color:#686868;">{{pin.createdBy.firstName}} {{pin.createdBy.lastName}}</a></h4>
                    </div>
                    <img class="card-img-top" [src]="pin.imageUrl" style="width:100%; margin-top:10px;" alt="Card image cap">
                    <div class="card-block">
                        <h4 class="card-title">{{pin.title}}</h4>
                        <p class="card-text">{{pin.text}}</p>
                        <button class="btn btn-sm btn-primary" *ngIf="!pin.didCurrentUserLikePin" (click)="likePin()">Like</button>
                        <button class="btn btn-sm btn-outline-primary" *ngIf="pin.didCurrentUserLikePin" (click)="unlikePin()">Unlike</button>
                        <b>{{pin.numberOfLikes}}</b> Likes
                        <p class="card-text">
                            <small class="text-muted">Posted: {{pin.date}}</small>
                        </p>
                    </div>
                    <div class="card-block">
                        <div *ngIf="pin.comments">
                            <h5>Comments:</h5>
                            <div *ngFor="let comment of pin.comments">
                                <hr>
                                <b><a [routerLink]="'/profile/' + comment.creator.id" style="color:#686868;">{{comment.creator.firstName}} {{comment.creator.lastName}}</a></b>: 
                                <span>{{comment.text}}</span>
                                <span style="cursor:pointer;" (click)="deleteComment(comment.id)" *ngIf="isEditMode">&times;</span>
                            </div>
                            <br>
                        </div>
                        <div class="form-inline">
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Your comment" #commentInput>
                            </div>
                            <button class="btn btn-outline-primary" (click)="postComment(commentInput)">Post comment</button>
                        </div>
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
    public isEditMode: boolean;

    private pinService: PinService;

    constructor(pinService: PinService){
        this.pinService = pinService;
    }

    public deletePin(){
        this.pinService.deletePin(this.pin);
    }
    public deleteComment(id: number){
        this.pinService.deleteComment(id);
    }
    public postComment(commentInput: HTMLInputElement){
        if(commentInput.value != "")
        {
            this.pinService.postComment(this.pin, commentInput.value);
            commentInput.value = "";
        }
    }
    public likePin(){
        this.pinService.likePin(this.pin);
    }
    public unlikePin(){
        this.pinService.unlikePin(this.pin);
    }
}