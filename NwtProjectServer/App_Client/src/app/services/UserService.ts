import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';

import User from './../models/User';

@Injectable()
export default class UserService {
    private currentlyFetchedFollowedUsers: User[];
    private currentlyFetchedSearchResultUsers: User[];
    private http: Http;

    constructor(http: Http) {
        this.http = http;
    }
    public getAllUsers() {
        return this.http.get("http://localhost:31696/api/Users/AllUsers");
    }
    public getFolowedUsers(){
        return this.http.get("http://localhost:31696/api/Users/FollowedUsers");
    }
    public getUsersBySearchString(searchString: string){
        let params: URLSearchParams = new URLSearchParams();
        params.set('searchString', searchString);

        return this.http.get("http://localhost:31696/api/Users/UsersByString", { search: params });
    }
    public getUserById(id: string){
        return this.http.get("http://localhost:31696/api/Users/GetUser/" + id);
    }
    public getCurrentUser(){
        
    }
    public getCurrentUserEMail(){
        return "test@example.com";
    }
    public followUser(user: User){
        // Follow user on server
        user.doesCurrentUserFollowThisUser = true;
    }
    public unfollowUser(user: User){
        // Unfollow user on server
        user.doesCurrentUserFollowThisUser = false;
    }
}