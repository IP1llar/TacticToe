import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public authService:AuthService, public router : Router) { }

  ngOnInit(): void {
  }

  onLogout() {
    this.authService.logout()
      .subscribe((response : any ) => { // TODO: fix typing
        console.log('response', response);
        this.authService.setUserInfo({});
        this.router.navigate(['login'])
      })
  }

}
