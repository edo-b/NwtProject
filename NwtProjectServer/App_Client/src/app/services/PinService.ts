import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import Pin from './../models/Pin';
import User from './../models/User';
import Comment from './../models/Comment';

@Injectable()
export default class PinService {
    private currentPins: Pin[];
    private http: Http;

    constructor(http: Http) {
        this.http = http;
        //this.currentPins = this.getTestPins();
        this.http.get("http://localhost:31696/api/Pins")
            .subscribe(
            response => {
                const serverItems: Array<any> = response.json();
                this.currentPins = serverItems.map(it => new Pin(it.Id, it.ImageUrl, it.Text, it.Title, it.PostedOn, false, it.NuberOfLikes, it.CreatedBy, it.Comments));
            },
            error => console.log("Error when getting todoItems")
            ); 
    }

    private getTestPins(){
        return [
            new Pin(10, "http://kpd-sloga.hr/wp-content/themes/anderson-lite/images/default-slider-image.png",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus maximus nulla vel risus tincidunt, non vestibulum quam elementum. Pellentesque et molestie dolor. ",
                    "This is title",
                new Date(2016, 12, 15),
                true,
                57,
                new User(1, "Marko", "Matić", "https://image.freepik.com/free-icon/user-male-shape-in-a-circle-ios-7-interface-symbol_318-35357.jpg", true),
                [
                    new Comment(
                        1,
                        new User(1, "Marko", "Matić", "https://image.freepik.com/free-icon/user-male-shape-in-a-circle-ios-7-interface-symbol_318-35357.jpg", false),
                        "This is a test comment"
                        ),
                    new Comment(
                        2,
                        new User(2, "Ante", "Antić", "https://upload.wikimedia.org/wikipedia/commons/d/d3/User_Circle.png", true),
                        "This is a test comment"
                        )
                ]),
            new Pin(11, "http://kpd-sloga.hr/wp-content/themes/anderson-lite/images/default-slider-image.png",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus maximus nulla vel risus tincidunt, non vestibulum quam elementum. Pellentesque et molestie dolor. ",
                    "This is title",
                new Date(2016, 12, 15),
                false,
                3,
                new User(2, "Ante", "Antić", "https://upload.wikimedia.org/wikipedia/commons/d/d3/User_Circle.png", true),
                null),
            new Pin(12, "http://kpd-sloga.hr/wp-content/themes/anderson-lite/images/default-slider-image.png",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus maximus nulla vel risus tincidunt, non vestibulum quam elementum. Pellentesque et molestie dolor. ",
                    "This is title",
                new Date(2016, 12, 15),
                true,
                7,
                new User(9, "Martina", "Martinić", "http://colorvisiontesting.com/images/plate%20with%205.jpg", false),
                [
                    new Comment(
                        3,
                        new User(9, "Martina", "Martinić", "http://colorvisiontesting.com/images/plate%20with%205.jpg", true),
                        "This is a test comment"
                        )
                ]
                ),
            new Pin(13, "http://kpd-sloga.hr/wp-content/themes/anderson-lite/images/default-slider-image.png",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus maximus nulla vel risus tincidunt, non vestibulum quam elementum. Pellentesque et molestie dolor. ",
                    "This is title",
                new Date(2016, 12, 15),
                false,
                13,
                new User(6, "Jure", "Jurić", "https://image.freepik.com/free-icon/user-male-shape-in-a-circle-ios-7-interface-symbol_318-39025.jpg", true),
                undefined),
            new Pin(14, "http://kpd-sloga.hr/wp-content/themes/anderson-lite/images/default-slider-image.png",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus maximus nulla vel risus tincidunt, non vestibulum quam elementum. Pellentesque et molestie dolor. ",
                    "This is title",
                new Date(2016, 12, 15),
                true,
                0,
                new User(10, "Anamarija", "Abeceić", "https://www.sencha.com/wp-content/uploads/2016/02/icon-sencha-test-studio.png", false),
                [
                    new Comment(
                        4,
                        new User(9, "Martina", "Martinić", "http://colorvisiontesting.com/images/plate%20with%205.jpg", false),
                        "This is a test comment"
                        ),
                    new Comment(
                        5,
                        new User(10, "Anamarija", "Abeceić", "https://www.sencha.com/wp-content/uploads/2016/02/icon-sencha-test-studio.png", true),
                        "This is a test comment"
                        ),
                    new Comment(
                        6,
                        new User(1, "Marko", "Matić", "https://image.freepik.com/free-icon/user-male-shape-in-a-circle-ios-7-interface-symbol_318-35357.jpg", true),
                        "This is a test comment"
                        )
                ]
                ),
        ];
    }

    //Allways get pins from server for new component and store pins in currentPins

    public getNewsFeedPins(){
        this.currentPins = this.getTestPins();

        return this.currentPins;
    }
    public getMyPins(){
        this.currentPins = this.getTestPins();

        return this.currentPins;
    }
    public getPinsOfUser(id: number){
        this.currentPins = this.getTestPins();

        return this.currentPins;
    }
    public deletePin(pinToDelete: Pin){
        //delete pin on server
        this.currentPins.splice(this.currentPins.indexOf(pinToDelete), 1);
    }
    public deleteComment(pin: Pin, commentId: number){
        //delete comment on server
        this.currentPins[this.currentPins.indexOf(pin)].comments.splice(this.currentPins[this.currentPins.indexOf(pin)].comments.indexOf(this.currentPins[this.currentPins.indexOf(pin)].comments.find(x=>x.id == commentId)), 1);
    }
    public postComment(pin: Pin, text: string){
        //Post comment on server and retrieve ID
        this.currentPins[this.currentPins.indexOf(pin)].comments.push(new Comment(777, new User(777, "Test", "User", null, null), text));
    }
    public likePin(pin: Pin){
        //Like pin on server
        this.currentPins[this.currentPins.indexOf(pin)].didCurrentUserLikePin = true;
    }
    public unlikePin(pin: Pin){
        //Unike pin on server
        this.currentPins[this.currentPins.indexOf(pin)].didCurrentUserLikePin = false;
    }
    public createNewPin(pinTitle: string, pinText: string, imageFile: File){
        //upload picture to server and create pin on server
        this.currentPins.push(new Pin(15, "", pinText, pinTitle, null, false, 0, new User(777, "Test", "User", null, null), null))
    }
}