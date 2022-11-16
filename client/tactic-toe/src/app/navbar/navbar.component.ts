import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    public authService:AuthService, 
    private router : Router,
    private breakpointObserver : BreakpointObserver
    ) { }
    
    bigNav = false;
    isDark = false;
    clicked = false;

  onClick() {
    this.clicked = !this.clicked;
  }

  ngOnInit(): void {
    this.breakpointObserver
      .observe(['(min-width: 700px)'])
      .subscribe((state: BreakpointState) => {
        this.bigNav = state.matches;
        this.clicked = false;
      })
  }

  onLogout() {
    this.authService.logout()
      .subscribe((response ) => {
        this.authService.setUserInfo({});
        this.router.navigate(['login'])
      })
  }

  toggleDarkMode () {
    this.isDark = !this.isDark;
    if (this.isDark) this.loadTheme('darktheme.css');
    else {
      document.getElementById('darkTheme')?.remove()
    }
  }

  loadTheme(cssFile: string) {
    const head = document.getElementsByTagName('head')[0];
    const newLink = document.createElement('link');
    newLink.rel = 'stylesheet';
    newLink.href = cssFile;
    newLink.id = 'darkTheme'
    head.appendChild(newLink)
  }

}
