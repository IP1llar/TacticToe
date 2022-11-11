import { TmplAstRecursiveVisitor } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, take, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate { // TODO: implement route guard for unlogged in routes

  constructor(private authService: AuthService, private route : Router) { }
  
  canActivate() {
    return this.authService.isAuthenticated().pipe(take(1), tap(loggedIn => {
      if (!loggedIn) {
        this.authService.isLoggedIn = false;
        this.route.navigate(['login'])
      };
    }));
  }
}
