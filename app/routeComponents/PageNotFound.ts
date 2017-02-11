import { Component, Input } from '@angular/core';

@Component({
    selector: "page-not-found", 
    template: `
        <br>
        <br>
        <br>
        <br>        
        <div class="col-md-3"></div>
        <div class="col-md-6">
            <div class="card card-inverse card-danger text-center">
                <div class="card-block">
                    <blockquote class="card-blockquote">
                    <h1>404 Error Page not found</h1>
                    <p>The page you tried to access does not exist!</p>
                    <a class="btn btn-outline-secondary" routerLink="/home" routerLinkActive="active">Back to home</a>
                    </blockquote>
                </div>
            </div>
            <div class="col-md-3"></div>
        </div>
        
        `
})
export default class PageNotFoundRouteComponent {
}