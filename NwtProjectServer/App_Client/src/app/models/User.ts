export default class User{
    public id: string;
    public firstName: string;
    public lastName: string;
    public profileImageUrl: string;
    public doesCurrentUserFollowThisUser: boolean;
    constructor(id: string, firstName: string, lastName: string, profileImageUrl: string, doesCurrentUserFollowThisUser: boolean) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.profileImageUrl = profileImageUrl;
        this.doesCurrentUserFollowThisUser = doesCurrentUserFollowThisUser;
    }
}