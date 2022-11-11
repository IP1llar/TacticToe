import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public isAuthenticated(){
    console.log('checking if logged in')
    let result = false;
    return this.http.get('/api/loggedin', {withCredentials: true}).pipe(
      map(() => true),
      catchError(() => of(false))
    )
  }

  public setUserInfo(user:any) {
    localStorage.setItem('userInfo', JSON.stringify(user));
  }

  public validate(email:string, password:string) {
    console.log('Attempting validation');
    return this.http.post('/api/login', {'username': email, 'password': password}, {
      headers: {
        credentials: 'include',
        mode: 'cors',
      }
    });
  }
}
