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
        <pin *ngFor="let pin of dummyPins" [pin]=pin [isEditMode]=true></pin>
    `
})
export default class MyPinsComponent {
    private myPins: Pin[];

    constructor(pinservice: PinService) {
        this.myPins = [];
        pinservice.getMyPins()
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
}