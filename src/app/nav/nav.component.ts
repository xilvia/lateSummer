import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { AuthDataDto } from '../auth/authDataModel';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authListenerSubscription: Subscription;
  loggedUser: string;

  constructor(private authService: AuthService) {}

  getAuthListenerSubscription(): Subscription {
    return this.authListenerSubscription;
  }

  ngOnInit(): void {
    this.userIsAuthenticated = this.authService.getIsAuthenticated();
    this.authListenerSubscription = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
        console.log(isAuthenticated);
        if (isAuthenticated) {
          this.loggedUser = JSON.parse(localStorage.getItem('userName'));
        }
      });
  }

  onLogout(): void {
    this.authService.logout();
    localStorage.removeItem('userName');
  }

  ngOnDestroy(): void {
    this.authListenerSubscription.unsubscribe();
  }
}
