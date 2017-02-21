import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import PinService from './services/PinService';
import UserService from './services/UserService';

@Component({
  selector: 'my-app',
  template: `<router-outlet></router-outlet>`,
  providers: [PinService, UserService]
})
export class AppComponent {
    constructor(private router: Router) { }
    
    ngOnInit() {
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            document.body.scrollTop = 0;
        });
    }
}
