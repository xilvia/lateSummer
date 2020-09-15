import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserService } from '../user/services/user.service';
import { apiConfig } from '../common/apiConfig';
import { AuthDataDto } from './authDataModel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly url = `${apiConfig.url}/login`;
  private userId: number;
  private token: string;
  private isAuthenticated = false;
  private tokenTimer: number;

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) {}

  get token() {
    return this.token;
  }

  get userId() {
    return this.userId;
  }

  get isAuthenticated() {
    return this.isAuthenticated;
  }

  login(authDataDto: AuthDataDto): BehaviorSubject<AuthDataDto> {
    console.log(authDataDto);
    this.http
      .post<{ token: string; expiresIn: number; userId: number }>(
        this.url,
        authDataDto
      )
      .subscribe((response) => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.isAuthenticated = true;
          this.userId = response.userId;
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + expiresInDuration * 1000
          );
          console.log(expirationDate);
          this.saveAuthData(token, expirationDate, this.userId);
          this.router.navigate(['/']);
        }
      });

    return;
  }
  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.userId = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: number) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', JSON.stringify(userId));
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate),
      userId,
    };
  }
}
