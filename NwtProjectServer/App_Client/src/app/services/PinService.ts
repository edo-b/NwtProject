import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import Pin from './../models/Pin';
import User from './../models/User';
import Comment from './../models/Comment';

@Injectable()
export default class PinService {
    private currentPins: Pin[];
    private http: Http;

    constructor(http: Http) {
        this.http = http;
        this.currentPins = [];
    }

    //Allways get pins from server for new component and store pins in currentPins
    public getNewsFeedPins(){
        return this.http.get("http://localhost:31696/api/Pins/GetPins");
    }
    public getMyPins() {
        return this.http.get("http://localhost:31696/api/Pins/MyPins");
    }
    public getPinsOfUser(id: string) {
        return this.http.get("http://localhost:31696/api/Pins/PinsOfUser/" + id);
    }
    public deletePin(pinToDelete: Pin) {
        return this.http.delete("http://localhost:31696/api/Pins/DeletePin/" + pinToDelete.id);
    }
    public deleteComment(pin: Pin, commentId: number) {
        return this.http.post('http://localhost:31696/api/Pins/DeleteComment/' + commentId, { id: commentId });
    }
    public postComment(pin: Pin, text: string) {
        return this.http.post('http://localhost:31696/api/Pins/CommentPin/' + pin.id, {Id: pin.id, Text: text});
    }
    public likePin(pin: Pin) {
        return this.http.post('http://localhost:31696/api/Pins/LikePin/' + pin.id, { Id: pin.id });
    }
    public unlikePin(pin: Pin) {
        return this.http.post('http://localhost:31696/api/Pins/UnlikePin/' + pin.id, { Id: pin.id });
    }
    public createNewPin(pinTitle: string, pinText: string, imageSrc: string) {
        return this.http.post("http://localhost:31696/api/Pins/PostPin", { Title: pinTitle, Text: pinText, PictureDataUri: imageSrc});
    }
}