import { Component, Input } from '@angular/core';

@Component({
    selector: "find", 
    template: `
        <div class="container">
            <form class="form-inline">
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" class="form-control" placeholder="Jane Doe">
                </div>
                <button type="submit" class="btn btn-primary">Find profile</button>
            </form>
            <br>
            <br>
            <h2>People you follow</h2>
            <br>
            <div class="row">
                <img class="img-thumbnail col-md-4" src="https://app.nimia.com/static/img/default_profile.png" style="width:100px;"/>
                <a class="col-md-8" href="sample_profile.html" style="color:black; font-size:20px; text-decoration:none;">John Doe</a>
            </div>
            <hr>
            <div class="row">
                <img class="img-thumbnail col-md-4" src="https://app.nimia.com/static/img/default_profile.png" style="width:100px;"/>
                <a class="col-md-8" href="sample_profile.html" style="color:black; font-size:20px; text-decoration:none;">John Doe</a>
            </div>
            <hr>
            <div class="row">
                <img class="img-thumbnail col-md-4" src="https://app.nimia.com/static/img/default_profile.png" style="width:100px;"/>
                <a class="col-md-8" href="sample_profile.html" style="color:black; font-size:20px; text-decoration:none;">John Doe</a>
            </div>
            <hr>
            <div class="row">
                <img class="img-thumbnail col-md-4" src="https://app.nimia.com/static/img/default_profile.png" style="width:100px;"/>
                <a class="col-md-8" href="sample_profile.html" style="color:black; font-size:20px; text-decoration:none;">John Doe</a>
            </div>
            <hr>
        </div>
    `
})
export default class FindUsersComponent {
}