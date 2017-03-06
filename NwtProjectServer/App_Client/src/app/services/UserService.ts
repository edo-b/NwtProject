import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';

import User from './../models/User';

@Injectable()
export default class UserService {
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
    public followUser(user: User){
        return this.http.put("http://localhost:31696/api/Users/FollowUser/" + user.id, { id: user.id });
    }
    public unfollowUser(user: User){
        return this.http.put("http://localhost:31696/api/Users/UnfollowUser/" + user.id, { id: user.id });
    }
}