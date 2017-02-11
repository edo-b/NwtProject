import { Injectable } from '@angular/core';
import Pin from './../models/Pin';
import User from './../models/User';
import Comment from './../models/Comment';

@Injectable()
export default class PinService {
    private testPins: Pin[];
    private testComments: Comment[];

    constructor() { // HARDKODIRANOOOOOOO
        this.testComments = [
            new Comment(
                1,
                new User(1, "Marko", "Matić", "https://image.freepik.com/free-icon/user-male-shape-in-a-circle-ios-7-interface-symbol_318-35357.jpg"),
                "This is a test comment"
                ),
            new Comment(
                1,
                new User(1, "Marko", "Matić", "https://image.freepik.com/free-icon/user-male-shape-in-a-circle-ios-7-interface-symbol_318-35357.jpg"),
                "This is a test comment"
                ),
            new Comment(
                1,
                new User(1, "Marko", "Matić", "https://image.freepik.com/free-icon/user-male-shape-in-a-circle-ios-7-interface-symbol_318-35357.jpg"),
                "This is a test comment"
                ),
            new Comment(
                1,
                new User(1, "Marko", "Matić", "https://image.freepik.com/free-icon/user-male-shape-in-a-circle-ios-7-interface-symbol_318-35357.jpg"),
                "This is a test comment"
                ),
            new Comment(
                1,
                new User(1, "Marko", "Matić", "https://image.freepik.com/free-icon/user-male-shape-in-a-circle-ios-7-interface-symbol_318-35357.jpg"),
                "This is a test comment"
                )
        ];
        this.testPins = [
            new Pin("http://kpd-sloga.hr/wp-content/themes/anderson-lite/images/default-slider-image.png",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus maximus nulla vel risus tincidunt, non vestibulum quam elementum. Pellentesque et molestie dolor. ",
                    "This is title",
                new Date(2016, 12, 15),
                true,
                57,
                new User(1, "Marko", "Matić", "https://image.freepik.com/free-icon/user-male-shape-in-a-circle-ios-7-interface-symbol_318-35357.jpg"),
                this.testComments),
            new Pin("http://kpd-sloga.hr/wp-content/themes/anderson-lite/images/default-slider-image.png",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus maximus nulla vel risus tincidunt, non vestibulum quam elementum. Pellentesque et molestie dolor. ",
                    "This is title",
                new Date(2016, 12, 15),
                false,
                3,
                new User(2, "Ante", "Antić", "https://upload.wikimedia.org/wikipedia/commons/d/d3/User_Circle.png"),
                null),
            new Pin("http://kpd-sloga.hr/wp-content/themes/anderson-lite/images/default-slider-image.png",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus maximus nulla vel risus tincidunt, non vestibulum quam elementum. Pellentesque et molestie dolor. ",
                    "This is title",
                new Date(2016, 12, 15),
                true,
                7,
                new User(9, "Martina", "Martinić", "http://colorvisiontesting.com/images/plate%20with%205.jpg"),
                this.testComments),
            new Pin("http://kpd-sloga.hr/wp-content/themes/anderson-lite/images/default-slider-image.png",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus maximus nulla vel risus tincidunt, non vestibulum quam elementum. Pellentesque et molestie dolor. ",
                    "This is title",
                new Date(2016, 12, 15),
                false,
                13,
                new User(6, "Jure", "Jurić", "https://image.freepik.com/free-icon/user-male-shape-in-a-circle-ios-7-interface-symbol_318-39025.jpg"),
                undefined),
            new Pin("http://kpd-sloga.hr/wp-content/themes/anderson-lite/images/default-slider-image.png",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus maximus nulla vel risus tincidunt, non vestibulum quam elementum. Pellentesque et molestie dolor. ",
                    "This is title",
                new Date(2016, 12, 15),
                true,
                0,
                new User(10, "Anamarija", "Abeceić", "https://www.sencha.com/wp-content/uploads/2016/02/icon-sencha-test-studio.png"),
                this.testComments),
        ];
    }

    public getTestPins(){
        return this.testPins;
    }
    public getPinsOfUser(id: number){
        return this.testPins;
    }
    public deletePin(id: number){
        //delete pin on server
        this.testPins.splice(this.testPins.indexOf(this.testPins.find(x=>x.createdBy.id == 1)), 1);
    }
}