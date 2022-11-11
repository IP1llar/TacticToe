import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userEmail: string = '';
  userPassword: string = '';

  constructor(private authService : AuthService, private router : Router, private http : HttpClient) { }

  ngOnInit(): void {
  }

  login() {
    this.authService.validate('isaac.pillar@gmail.com', 'password')
      .subscribe((response : any ) => { // TODO: fix typing
        console.log('response', response);
        this.authService.setUserInfo({'user' : response['user']});
        this.router.navigate(['home'])
      })
  }

  checkLoggedIn() {
    this.http.get('/api/loggedin', {withCredentials: true}).subscribe(data => {
      console.log({data})
    })
  }

}
