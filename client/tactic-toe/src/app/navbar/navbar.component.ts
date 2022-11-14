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
    private host: ElementRef) { }

  isDark = false;

  lightMode = {
    'primary-bg-color': '#fffafbff',
    'nav-bg-color': '#7de2d1ff',
    'nav-text-color': '#fffafbff',
    'text-accent-color': '#339989ff',
    'button-color': '#339989ff',
    'text-color': '#2b2c28ff',
    'shadow-color': '#B5B8ABff',
    'error': '#c83f3fff'
  }

  darkMode = {
    'primary-bg-color': '#2b2c28ff',
    'nav-bg-color': '#b5b8abff',
    'nav-text-color': '#fffafbff',
    'text-accent-color': '#339989ff',
    'button-color': '#339989ff',
    'text-color': '#fffafbff',
    'shadow-color': '#B5B8ABff',
    'error': '#c83f3fff'
  }

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

  toggleDarkMode () { // TODO: Make work
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
