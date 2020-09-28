import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserService } from '../user/services/user.service';
import { apiConfig } from '../common/apiConfig';
import { AuthDataDto } from './authDataModel';
import { Observable } from 'rxjs/internal/Observable';
import { CreateUserDto } from '../user/dataModel/createUserDto';
import { UserDto } from '../user/dataModel/userDto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly loginUrl = `${apiConfig.url}/api/v1/auth/login`;
  private readonly signUpUrl = `${apiConfig.url}/api/v1/auth/signup`;
  private userId: string;
  private userName: string;
  private token: string;
  private isAuthenticated = false;
  private tokenTimer: number;
  private authStatusListener = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) {}

  getToken(): string {
    return this.token;
  }

  getUserId(): string {
    return this.userId;
  }

  getUserName(): string {
    return this.userName;
  }

  getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  getAuthStatusListener(): Observable<boolean> {
    return this.authStatusListener.asObservable();
  }

  signup(createUserDto: CreateUserDto): BehaviorSubject<UserDto> {
    return this.http.post<UserDto>(
      this.signUpUrl,
      createUserDto
    ) as BehaviorSubject<UserDto>;
  }

  login(authDataDto: AuthDataDto): BehaviorSubject<AuthDataDto> {
    localStorage.clear();
    console.log(authDataDto, this.loginUrl);
    this.http
      .post<{ token: string; expiresIn: string; userId: string }>(
        this.loginUrl,
        authDataDto
      )
      .subscribe(
        (response) => {
          console.log(response);
          const token = response.token;
          console.log(response);
          this.token = token;
          if (token) {
            const expiresInDuration = response.expiresIn;
            console.log(expiresInDuration);
            this.isAuthenticated = true;
            this.userId = response.userId;
            this.authStatusListener.next(true);
            console.log(this.userId);
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + +expiresInDuration * 1000
            );
            console.log(expirationDate);
            this.saveAuthData(token, expirationDate, this.userId);
            this.saveLoggedUserName(authDataDto);
            this.router.navigate(['/']);
          }
        },
        (error) => this.authStatusListener.next(false)
      );

    return;
  }

  autoAuthUser(): void {
    console.log('autoAuthUser');
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      console.log(expiresIn);
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout(): void {
    this.token = null;
    this.isAuthenticated = false;
    this.userId = null;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  private setAuthTimer(duration: number): void {
    console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveLoggedUserName(authDataDto: AuthDataDto) {
    console.log(`save ${authDataDto.userName}`);
    localStorage.setItem('userName', JSON.stringify(authDataDto.userName));
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  private clearAuthData(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
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
