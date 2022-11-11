import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    userEmail: ['', [Validators.required, Validators.email]], // TODO: validate
    userPassword: ['', [Validators.required, Validators.minLength(6)]]
  })

  constructor(
    private authService : AuthService, 
    private router : Router, 
    private http : HttpClient,
    private fb : FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.warn(this.loginForm.value);
    this.login(this.loginForm.value.userEmail as string, this.loginForm.value.userPassword as string);
  }

  login(email: string, password: string) {
    this.authService.validate(email, password)
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
