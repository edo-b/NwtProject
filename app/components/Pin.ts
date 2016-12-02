import { Component, Input } from '@angular/core';

@Component({
    selector: "pin", 
    template: `
        <div class="row">
                <div class="col-md-2"></div>
                <div class="card col-md-8">
                    <div class="card-block">
                        <h4 class="card-title"><a href="sample_profile.html" style="color:#686868;">John Doe</a></h4>
                    </div>
                    <img class="card-img-top" src="http://kpd-sloga.hr/wp-content/themes/anderson-lite/images/default-slider-image.png" style="width:100%; margin-top:10px;" alt="Card image cap">
                    <div class="card-block">
                        <h4 class="card-title">Post title</h4>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" class="btn btn-primary">Like</a>
                        <p class="card-text">
                            <small class="text-muted">Posted an hour ago</small>
                        </p>
                    </div>
                    <div class="card-block">
                        <h5>Comments:</h5>
                        <hr>
                        <b><a href="sample_profile.html" style="color:#686868;">John Doe</a></b>: <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit</span>
                        <hr>
                        <b><a href="sample_profile.html" style="color:#686868;">John Doe</a></b>: <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit</span>
                        <hr>
                        <b><a href="sample_profile.html" style="color:#686868;">John Doe</a></b>: <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non eleifend ligula. Sed sollicitudin dui hendrerit scelerisque sollicitudin. Vestibulum efficitur ornare porttitor</span>
                        <hr>
                        <form class="form-inline">
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Your comment">
                            </div>
                            <button type="submit" class="btn btn-outline-primary">Post comment</button>
                        </form>
                    </div>
                </div>
                <div class="col-md-2"></div>
            </div>
            <br>
    `
})
export default class PinComponent{
}