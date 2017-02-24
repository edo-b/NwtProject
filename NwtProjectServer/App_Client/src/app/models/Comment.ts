import User from './User';

export default class Comment{
    public id: number;
    public createdBy: User;
    public text: string;
    constructor(id: number, creator: User, text: string) {
        this.id = id;
        this.createdBy = creator;
        this.text = text;
    }
}