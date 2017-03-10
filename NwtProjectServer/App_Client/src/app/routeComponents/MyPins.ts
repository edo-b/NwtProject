import { Component, Input } from '@angular/core';

import Pin from './../models/Pin';
import PinService from './../services/PinService';

@Component({
    selector: "my-pins", 
    template: `
        <h2>Update your pins</h2>
        <hr>
        <br>
        <br>
        <pin *ngFor="let pin of myPins" (likeDeleteEvent)="likeDelete($event)" (commentEvent)="commentEvent($event)" [pin]=pin [isEditMode]=true></pin>
    `
})
export default class MyPinsComponent {
    private myPins: Pin[];
    private pinService: PinService;

    constructor(pinservice: PinService) {
        this.myPins = [];
        this.pinService = pinservice;
        this.pinService.getMyPins()
                .subscribe(
                    data => {
                        let serverItems: Array<any> = data.json();
                        if (serverItems) {
                            serverItems.forEach(it => this.myPins.push(new Pin(it.id, it.imageUrl, it.text, it.title, it.postedOn, it.didCurrentUserLikePin, it.numberOfLikes, it.createdBy, it.comments)));
                        }
                    },
                    error => console.log("Error when getting My Pins")
                );
    }

    public likeDelete(evt: any) {
        let pin = evt.pin;
        let action = evt.action;
        switch (action) {
            case "like":
                this.pinService.likePin(pin)
                    .subscribe(
                    response => {
                        this.myPins[this.myPins.indexOf(pin)].didCurrentUserLikePin = true;
                        this.myPins[this.myPins.indexOf(pin)].numberOfLikes++;
                    },
                    error => console.log("Error when sending like")
                    );
                break;
            case "unlike":
                this.pinService.unlikePin(pin)
                    .subscribe(
                    response => {
                        this.myPins[this.myPins.indexOf(pin)].didCurrentUserLikePin = false;
                        this.myPins[this.myPins.indexOf(pin)].numberOfLikes--;
                    },
                    error => console.log("Error when sending unlike")
                    );
                break;
            case "delete":
                this.pinService.deletePin(pin)
                    .subscribe(
                    response => {
                        this.myPins.splice(this.myPins.indexOf(pin), 1);
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
                        this.myPins[this.myPins.indexOf(pin)].comments.splice(this.myPins[this.myPins.indexOf(pin)].comments.indexOf(this.myPins[this.myPins.indexOf(pin)].comments.find(x => x.id == commentId)), 1);
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
                        if (!this.myPins[this.myPins.indexOf(pin)].comments) {
                            this.myPins[this.myPins.indexOf(pin)].comments = [];
                        }
                        this.myPins[this.myPins.indexOf(pin)].comments.push(comment);
                    },
                    error => console.log("Error when posting comment")
                    );
                break;
        }
    }
}