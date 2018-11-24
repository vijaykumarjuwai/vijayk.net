import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  headers;
  jwtHelper = new JwtHelperService();
  constructor(private http: HttpClient, private router: Router) { }

  private setToken(serverToken) {
    if (serverToken) {
      localStorage.setItem('auth-token', serverToken);
    }
  }

  getToken(): string {
    return localStorage.getItem('auth-token');
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) { return false; }
    if (!this.jwtHelper.isTokenExpired(token)) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    localStorage.removeItem('auth-token');
    this.router.navigate(['/home']);
  }

  getUserProfile() {
    if (!this.isLoggedIn) {
      return;
    }
    const decoded = this.jwtHelper.decodeToken(this.getToken());
    return decoded;
  }

  login(userData): Observable<any> {
    const loginApi = 'api/login';
    return this.http
      .post(loginApi, userData, {
        observe: 'response'
      })
      .pipe(
        map(res => {
          this.setToken(res.headers.get('Authorization'));
          return res;
        })
      );
  }

  register(userData): Observable<any> {
    const registerApi = 'api/register';
    return this.http
      .post(registerApi, userData, {
        observe: 'response'
      })
      .pipe(
        map(res => {
          console.log('Headers', res.headers);
          console.log('Token', res.headers.get('Authorization'));
          this.setToken(res.headers.get('Authorization'));
          return res;
        })
      );
  }
}
