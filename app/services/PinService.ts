import { Injectable } from '@angular/core';
import Pin from './../models/Pin';

@Injectable()
export default class PinService {
    private testPins: Pin[];

    constructor() { // HARDKODIRANOOOOOOO
        this.testPins = [
            new Pin("http://kpd-sloga.hr/wp-content/themes/anderson-lite/images/default-slider-image.png",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus maximus nulla vel risus tincidunt, non vestibulum quam elementum. Pellentesque et molestie dolor. ",
                    "This is title",
                new Date(2016, 12, 15),
                true,
                57,
                1),
            new Pin("http://kpd-sloga.hr/wp-content/themes/anderson-lite/images/default-slider-image.png",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus maximus nulla vel risus tincidunt, non vestibulum quam elementum. Pellentesque et molestie dolor. ",
                    "This is title",
                new Date(2016, 12, 15),
                false,
                3,
                1),
            new Pin("http://kpd-sloga.hr/wp-content/themes/anderson-lite/images/default-slider-image.png",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus maximus nulla vel risus tincidunt, non vestibulum quam elementum. Pellentesque et molestie dolor. ",
                    "This is title",
                new Date(2016, 12, 15),
                true,
                7,
                1),
            new Pin("http://kpd-sloga.hr/wp-content/themes/anderson-lite/images/default-slider-image.png",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus maximus nulla vel risus tincidunt, non vestibulum quam elementum. Pellentesque et molestie dolor. ",
                    "This is title",
                new Date(2016, 12, 15),
                false,
                13,
                1),
            new Pin("http://kpd-sloga.hr/wp-content/themes/anderson-lite/images/default-slider-image.png",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus maximus nulla vel risus tincidunt, non vestibulum quam elementum. Pellentesque et molestie dolor. ",
                    "This is title",
                new Date(2016, 12, 15),
                true,
                0,
                1),
        ];
    }

    public getTestPins(){
        return this.testPins;
    } 
}