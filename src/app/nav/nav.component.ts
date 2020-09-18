import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { AuthDataDto } from '../auth/authDataModel';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  private loggedName: string;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {

  }

  onLogout(): void {
    this.authService.logout();
  }
}
