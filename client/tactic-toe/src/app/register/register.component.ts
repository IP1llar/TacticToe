import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = this.fb.group({
    userEmail: ['', [Validators.required, Validators.email,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
    userFirstName: ['', [Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
    userLastName: ['', [Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
    userPassword: ['', [Validators.required, Validators.minLength(6),Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]] // TODO: Add second password (check typed correctly)
  })

  registerSuccess = 'null';

  onSubmit() {
    const { userEmail, userFirstName, userLastName, userPassword } = this.registerForm.value;

    this.authService.register(userEmail?.trim() as string, userFirstName?.trim() as string, userLastName?.trim() as string, userPassword?.trim() as string)
      .subscribe({
        next: (response) => {
          this.registerSuccess = 'success';
          this.router.navigate(['login'])
        },
        error: error => {
          console.log(error);
          this.registerSuccess = 'error';
        }
      })
  }

  constructor(private fb : FormBuilder, private authService : AuthService, private router: Router) { }

  ngOnInit(): void {
  }

}
