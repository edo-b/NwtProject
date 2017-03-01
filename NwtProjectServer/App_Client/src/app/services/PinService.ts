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
    public getNewsFeedPins(): Observable<Pin[]> {
        return this.http.get("http://localhost:31696/api/Pins")
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        const serverItems: Array<any> = res.json();
        return serverItems.map(it => new Pin(it.id, it.imageUrl, it.text, it.title, it.postedOn, false, it.numberOfLikes, it.createdBy, it.comments));
    }
    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    public getMyPins() {
        //this.currentPins = this.getTestPins();

        return this.currentPins;
    }
    public getPinsOfUser(id: string) {
        //this.currentPins = this.getTestPins();

        return this.currentPins;
    }
    public deletePin(pinToDelete: Pin) {
        //delete pin on server
        this.currentPins.splice(this.currentPins.indexOf(pinToDelete), 1);
    }
    public deleteComment(pin: Pin, commentId: number) {
        return this.http.post('http://localhost:31696/api/Pins/DeleteComment/' + commentId, { id: commentId });
    }
    public postComment(pin: Pin, text: string) {
        return this.http.post('http://localhost:31696/api/Pins/CommentPin/' + pin.id, {Id: pin.id, Text: text});
    }
    public likePin(pin: Pin) {
        //Like pin on server
        this.currentPins[this.currentPins.indexOf(pin)].didCurrentUserLikePin = true;
    }
    public unlikePin(pin: Pin) {
        //Unike pin on server
        this.currentPins[this.currentPins.indexOf(pin)].didCurrentUserLikePin = false;
    }
    public createNewPin(pinTitle: string, pinText: string, imageFile: File) {
        //upload picture to server and create pin on server
        this.currentPins.push(new Pin(15, "", pinText, pinTitle, null, false, 0, new User("asdfaef", "Test", "User", null, null), null))
    }
}