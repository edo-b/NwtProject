import { Component, Input } from '@angular/core';

@Component({
    selector: "profile",
    template: `
        <div class="container">

            <div class="row">
                <img class="img-thumbnail col-md-4" src="https://app.nimia.com/static/img/default_profile.png" style="width:200px;"/>
                <div class="col-md-8">
                   <h3>John Doe <button class="btn btn-outline-success">Follow</button></h3>
                   <br>
                   <br>
                   <br>
                   <h4>This users pins</h4>
                   <br>
                   <!--Pins of user-->

                    <div class="row">
                        <div class="col-md-2"></div>
                        <div class="card col-md-8">
                            <img class="card-img-top" src="http://kpd-sloga.hr/wp-content/themes/anderson-lite/images/default-slider-image.png" style="width:100%; margin-top:10px;" alt="Card image cap">
                            <div class="card-block">
                                <h4 class="card-title">Post title</h4>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="btn btn-primary">Like</a>
                            </div>
                        </div>
                        <div class="col-md-2"></div>
                    </div>

                    <div class="row">
                        <div class="col-md-2"></div>
                        <div class="card col-md-8">
                            <img class="card-img-top" src="http://kpd-sloga.hr/wp-content/themes/anderson-lite/images/default-slider-image.png" style="width:100%; margin-top:10px;" alt="Card image cap">
                            <div class="card-block">
                                <h4 class="card-title">Post title</h4>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="btn btn-primary">Like</a>
                            </div>
                        </div>
                        <div class="col-md-2"></div>
                    </div>

                    <div class="row">
                        <div class="col-md-2"></div>
                        <div class="card col-md-8">
                            <img class="card-img-top" src="http://kpd-sloga.hr/wp-content/themes/anderson-lite/images/default-slider-image.png" style="width:100%; margin-top:10px;" alt="Card image cap">
                            <div class="card-block">
                                <h4 class="card-title">Post title</h4>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="btn btn-primary">Like</a>
                            </div>
                        </div>
                        <div class="col-md-2"></div>
                    </div>

                    <div class="row">
                        <div class="col-md-2"></div>
                        <div class="card col-md-8">
                            <img class="card-img-top" src="http://kpd-sloga.hr/wp-content/themes/anderson-lite/images/default-slider-image.png" style="width:100%; margin-top:10px;" alt="Card image cap">
                            <div class="card-block">
                                <h4 class="card-title">Post title</h4>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="btn btn-primary">Like</a>
                            </div>
                        </div>
                        <div class="col-md-2"></div>
                    </div>

                </div>
            </div>
        </div>
    `
})
export default class ProfileComponent {
}