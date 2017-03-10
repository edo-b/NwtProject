import { Component, Input } from '@angular/core';

import Pin from './../models/Pin';
import User from './../models/User';
import Comment from './../models/Comment';
import PinService from './../services/PinService';

@Component({
    selector: "home", 
    template: `
        <div class="row">
            <div class="col-md-2"></div>
            <div class="col-md-8">
                <button type="button" class="btn btn-primary btn-lg btn-block" data-toggle="modal" data-target="#newPinModal" (click)="emptyModal(titleInput, textInput, fileInput)">
                    Add new pin
                </button>
            </div>
            <div class="col-md-2"></div>
        </div>

        <br>

        <pin *ngFor="let pin of newsFeedPins" (likeDeleteEvent)="likeDelete($event)" (commentEvent)="commentEvent($event)" [pin]=pin [isEditMode]=false></pin>

        <!--Add new pin modal-->
        <div class="modal fade" id="newPinModal">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title">Add new pin</h4>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                            <label>Pin title</label>
                            <input type="text" class="form-control" placeholder="Enter title" #titleInput>
                        </div>
                        <div class="form-group">
                            <label>Pin description</label>
                            <input type="text" class="form-control" placeholder="Enter description" #textInput>
                        </div>
                        <div class="form-group">
                            <label>Add image</label>
                            <input type="file" class="form-control" placeholder="Choose file" (change)="fileChangeEvent($event)" accept="image/*" #fileInput>
                        </div>
                        <div id="image-preview-div" *ngIf="previewSrc">
                            <img id="preview-image" [src]="previewSrc">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" (click)="addNewPin(titleInput, textInput, fileInput)" data-dismiss="modal">Add new pin</button> 
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->`
})
export default class HomeRouteComponent {
    private newsFeedPins: Pin[];
    private pinService: PinService;
    private file: any;
    public previewSrc: string;

    constructor(pinservice: PinService) {
        this.newsFeedPins = [];
        pinservice.getNewsFeedPins()
            .subscribe(
            data => {
                let serverItems: Array<any> = data.json();
                if (serverItems) {
                    serverItems.forEach(it => this.newsFeedPins.push(new Pin(it.id, it.imageUrl, it.text, it.title, it.postedOn, it.didCurrentUserLikePin, it.numberOfLikes, it.createdBy, it.comments)));
                }
            },
            error => console.log("Error when getting Pins")
            );
        this.pinService = pinservice;
    }
    public likeDelete(evt: any) {
        let pin = evt.pin;
        let action = evt.action;
        switch (action) {
            case "like":
                this.pinService.likePin(pin)
                    .subscribe(
                        response => {
                            this.newsFeedPins[this.newsFeedPins.indexOf(pin)].didCurrentUserLikePin = true;
                            this.newsFeedPins[this.newsFeedPins.indexOf(pin)].numberOfLikes++;
                        },
                        error => console.log("Error when sending like")
                    );
                break;
            case "unlike":
                this.pinService.unlikePin(pin)
                    .subscribe(
                        response => {
                            this.newsFeedPins[this.newsFeedPins.indexOf(pin)].didCurrentUserLikePin = false;
                            this.newsFeedPins[this.newsFeedPins.indexOf(pin)].numberOfLikes--;
                        },
                        error => console.log("Error when sending unlike")
                    );
                break;
            case "delete":
                this.pinService.deletePin(pin)
                    .subscribe(
                        response => {
                            this.newsFeedPins.splice(this.newsFeedPins.indexOf(pin), 1);
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
                        this.newsFeedPins[this.newsFeedPins.indexOf(pin)].comments.splice(this.newsFeedPins[this.newsFeedPins.indexOf(pin)].comments.indexOf(this.newsFeedPins[this.newsFeedPins.indexOf(pin)].comments.find(x => x.id == commentId)), 1);
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
                        if (!this.newsFeedPins[this.newsFeedPins.indexOf(pin)].comments) {
                            this.newsFeedPins[this.newsFeedPins.indexOf(pin)].comments = [];
                        }
                        this.newsFeedPins[this.newsFeedPins.indexOf(pin)].comments.push(comment);
                    },
                    error => console.log("Error when posting comment")
                    );
                break;
        }
    }
    public emptyModal(titleInput: HTMLInputElement, textInput: HTMLInputElement, fileInput: HTMLInputElement){
        titleInput.value = null;
        textInput.value = null;
        fileInput.value = null;
        this.file = null;
        this.previewSrc = null;
    }
    public fileChangeEvent(fileInput: any){
        if(fileInput.target.files && fileInput.target.files[0])
        {
            this.file = fileInput.target.files[0];
            var reader = new FileReader();

            reader.onload = ( e : any) => {
                this.previewSrc = e.target.result;
            }

            reader.readAsDataURL(fileInput.target.files[0]);
        }
        else{
            this.previewSrc = null;
            this.file = null;
        }
    }
    public addNewPin(titleInput: HTMLInputElement, textInput: HTMLInputElement, fileInput: HTMLInputElement){
        if (titleInput.value && textInput.value && this.file) {
            this.pinService.createNewPin(titleInput.value, textInput.value, this.previewSrc)
                    .subscribe(
                        response => {
                            let pin = response.json();
                            if (pin) {
                                this.newsFeedPins.push(pin);
                            }
                        },
                        error => console.log("Error when creatingPin")
                    );
        }
    }
}