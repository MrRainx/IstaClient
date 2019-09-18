import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UsersService } from './services/users.service';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  constructor(

    private router: Router,

    private loginSrv: UsersService

  ) { }

  async ngOnInit() {

    const user = this.loginSrv.getUserLoggedIn()

    if (user == null) {
      this.router.navigate(['login'])
    }



    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });

  }
}
