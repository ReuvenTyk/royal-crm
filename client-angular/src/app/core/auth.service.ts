import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Login, User } from '../shared/types';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements CanActivateChild {
  private readonly tokenField = 'token';
  redirectUrl: string | null = null;
  constructor(private apiService: ApiService, private router: Router) {}

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Promise<boolean> {
    //is the user logged in
    if (this.isLoggedIn()) {
      return true;
    }
    //store the attempted url for redirection
    this.redirectUrl = state.url;

    return this.router.navigate(['login-component']);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return token && token.length > 0 ? true : false;
  }

  login(details: Login): Observable<User> {
    return this.apiService.login(details).pipe(
      tap((data: User) => {
        if (data.token) {
          localStorage.setItem(this.tokenField, data.token);
          this.apiService.setToken(data.token);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem(this.tokenField);
    this.apiService.setToken('');
  }
}
