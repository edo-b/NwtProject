export default class Pin{
    public Id: number;
    public fullName: string;
    public profileImageUrl: string;
    constructor(id: number, fullName: string, profileImageUrl: string) {
        this.Id = id;
        this.fullName = fullName;
        this.profileImageUrl = profileImageUrl;
    }
}