import { Component, Input } from '@angular/core';

@Component({
    selector: "login", 
    template: `
        <div class="login-container">
            <div class="form-container">
                <div class="col-md-3"></div>
                <div class="col-md-6 well">
                    <legend>Login</legend>
                    <form method="post">
                        <div class="form-group">
                            <label class="control-label">Username</label>
                            <input type="text" class="form-control" id="username-input-field" name="username" />
                        </div>
                        <div class="form-group">
                            <label class="control-label">Password</label>
                            <input type="password" class="form-control" name="password" />
                        </div>
                        <input type="submit" class="btn btn-primary col-md-12" value="Prijava" /> 
                    </form>
                </div>
                <div class="col-md-3"></div>
            </div>
        </div>
    `
})
export default class LoginComponent {
}