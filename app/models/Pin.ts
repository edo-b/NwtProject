import User from './User';
import Comment from './Comment';

export default class Pin{
    public Id: number;
    public createdBy: User;
    public imageUrl: string;
    public text: string;
    public title: string;
    public postedOn: Date;
    public didCurrentUserLikePin: boolean;
    public numberOfLikes: number;
    public comments: Comment[];
    constructor(imageUrl: string, text: string, title: string, postedOn:Date, didCurrentUserLikePin: boolean, numberOfLikes: number, userThatCreatedPin: User, comments: Comment[]) {
        this.imageUrl = imageUrl;
        this.text = text;
        this.title = title;
        this.postedOn = postedOn;
        this.didCurrentUserLikePin = didCurrentUserLikePin;
        this.numberOfLikes = numberOfLikes;
        this.createdBy = userThatCreatedPin;
        this.comments = comments; //HARDKODIRANOOOOOOOO i u templateu
    }
}