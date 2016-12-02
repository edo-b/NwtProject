import { Component, Input } from '@angular/core';

@Component({
    selector: "home", 
    template: `
        <div class="container">
            
            <div class="row">
                <!-- Button trigger modal -->
                <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#newPinModal">
                Add new pin
                </button>
            <div>

            <pin *ngFor="let pin of _dummyPins"></pin>

        <!--Add new pin modal-->
        <div class="modal fade" id="newPinModal">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title">Add new pin</h4>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                            <label>Pin text</label>
                            <input type="text" class="form-control" placeholder="Enter text">
                        </div>
                        <div class="form-group">
                            <label>Add image</label>
                            <input type="file" value="Choose image" class="form-control" placeholder="Chose file">
                        </div>
                        <label>Choose tag</label>
                        <div class="form-check">
                            <label class="form-check-label">
                                <input class="form-check-input" type="checkbox" value="">
                                Food
                            </label>
                            <label class="form-check-label">
                                <input class="form-check-input" type="checkbox" value="">
                                Fitness
                            </label>
                            <label class="form-check-label">
                                <input class="form-check-input" type="checkbox" value="">
                                Book
                            </label>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <input type="submit" class="btn btn-primary" value="Add pin" /> 
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->`
})
export default class HomeRouteComponent {
    private _dummyPins = ["Dummy", "Dummy", "Dummy", "Dummy", "Dummy", "Dummy"];
}