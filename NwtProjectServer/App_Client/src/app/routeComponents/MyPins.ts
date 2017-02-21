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
    private dummyPins: Pin[];

    constructor(pinservice: PinService) {
        this.dummyPins = pinservice.getMyPins();
    }
}