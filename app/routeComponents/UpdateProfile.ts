import { Component, Input } from '@angular/core';

@Component({
    selector: "update-profile",
    template: `
    <div class="container">
        <h1>Update profile</h1>
            <hr>
            <br>
            <div class="row">
                <img class="img-thumbnail col-md-4" src="https://app.nimia.com/static/img/default_profile.png" style="width:200px;"/>
                <div class="col-md-8">
                    <form>
                        <div class="form-group">
                            <label>Email address</label>
                            <input type="email" class="form-control" placeholder="Enter email">
                        </div>
                        <div class="form-group">
                            <label >Password</label>
                            <input type="password" class="form-control" placeholder="Password">
                        </div>
                        <div class="form-group">
                            <label>First name</label>
                            <input type="text" class="form-control" placeholder="Enter email">
                        </div>
                        <div class="form-group">
                            <label>Last name</label>
                            <input type="text" class="form-control" placeholder="Enter email">
                        </div>
                        <div class="form-group">
                            <label>Something</label>
                            <input type="text" class="form-control" placeholder="Enter email">
                        </div>
                        <div class="form-group">
                            <label>Something</label>
                            <input type="text" class="form-control" placeholder="Enter email">
                        </div>
                        <button class="btn btn-primary">Update profile</button>
                        <a class="btn btn-danger" routerLink="/home">Cancel</a>
                    </form>
                </div>
            </div>
        </div>
    `
})
export default class ProfileComponent {
}