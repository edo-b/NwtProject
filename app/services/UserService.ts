import { Injectable } from '@angular/core';
import User from './../models/User';

@Injectable()
export default class UserService {
    //for now returning dummy data
    private dummyData: User[];
    
    constructor() {
        this.dummyData = [
            new User(1, "Marko", "Matić", "https://image.freepik.com/free-icon/user-male-shape-in-a-circle-ios-7-interface-symbol_318-35357.jpg", true),
            new User(2, "Ante", "Antić", "https://upload.wikimedia.org/wikipedia/commons/d/d3/User_Circle.png", false),
            new User(3, "Luka", "Lukić", "http://www.ccusersforum.org/images/user.png", false),
            new User(4, "Toni", "Martić", "http://icons.iconarchive.com/icons/hopstarter/scrap/256/User-icon.png", true),
            new User(5, "Ivan", "Ivić", "http://icons.iconarchive.com/icons/double-j-design/origami-colored-pencil/256/blue-user-icon.png", true),
            new User(6, "Jure", "Jurić", "https://image.freepik.com/free-icon/user-male-shape-in-a-circle-ios-7-interface-symbol_318-39025.jpg", false),
            new User(7, "Dino", "Dinosaurić", "http://downloadicons.net/sites/default/files/user-icon-45917.png", true),
            new User(8, "Ivana", "Ivanković", "https://upload.wikimedia.org/wikipedia/en/thumb/c/ce/User-info.svg/1024px-User-info.svg.png", false),
            new User(9, "Martina", "Martinić", "http://colorvisiontesting.com/images/plate%20with%205.jpg", true),
            new User(10, "Anamaria", "Abeceić", "https://www.sencha.com/wp-content/uploads/2016/02/icon-sencha-test-studio.png", true)
        ];
    }
    public getFolowedUsers(){
        //retrieve users from server that current user follows
        return this.dummyData;
    } 
    public getUsersBySearchString(searchString: string){
        //retrieve users from server that have searchString in fullname
        return this.dummyData;
    }
    public getUserById(id: number){
        //get user from server
        return this.dummyData.find(x => x.id == id);
    }
    public getCurrentUser(){
        //get user of this session from server
        return new User(1, "Test", "User", "http://www.wikiality.com/file/2016/11/bears1.jpg", null);
    }
    public getCurrentUserEMail(){
        return "test@example.com";
    }
    public followUser(user: User){
        // Follow user on server

    }
    public unfollowUser(user: User){
        // Unfollow user on server
        
    }
}