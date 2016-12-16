export default class Pin{
    public Id: number;
    public imageUrl: string;
    public userId: number;
    public text: string;
    public title: string;
    public postedOn: Date;
    public didCurrentUserLikePin: boolean;
    public numberOfLikes: number;
    public comments: any[]
    constructor(imageUrl: string, text: string, title: string, postedOn:Date, didCurrentUserLikePin: boolean, numberOfLikes: number, userId: number) {
        this.imageUrl = imageUrl;
        this.text = text;
        this.title = title;
        this.postedOn = postedOn;
        this.didCurrentUserLikePin = didCurrentUserLikePin;
        this.numberOfLikes = numberOfLikes;
        this.userId = userId;
        this.comments = [{},{},{},{}]; //HARDKODIRANOOOOOOOO i u templateu
    }
}