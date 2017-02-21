import User from './User';

export default class Comment{
    public id: number;
    public creator: User;
    public text: string;
    constructor(id: number, creator: User, text: string) {
        this.id = id;
        this.creator = creator;
        this.text = text;
    }
}