import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { dataResponse, response } from './types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  

  public isLoggedIn = false;

  isAuthenticated(){
    let result = false;
    return this.http.get('/api/loggedin', {withCredentials: true}).pipe(
      map(() => {
        this.isLoggedIn = true;
        return true;
      }),
      catchError(() => of(false))
    )
  }

  setUserInfo(user:any) { // TODO: Make use of this
    localStorage.setItem('userInfo', JSON.stringify(user));
  }

  validate(email:string, password:string) {
    // {'statusCode': 200, 'message':'logged in', 'user':req.user}
    return this.http.post<dataResponse>('/api/login', {'username': email, 'password': password}, {withCredentials: true});
  }

  register(email:string, firstName:string, lastName:string, password:string) {
    return this.http.post<response>('/api/register', {email, firstName, lastName, password});
  }

  logout() {
    this.isLoggedIn = false;
    this.setUserInfo({});
    return this.http.delete<response>('/api/logout', {withCredentials: true});
  }

}
