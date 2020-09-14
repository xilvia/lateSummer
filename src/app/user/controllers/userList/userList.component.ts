import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MessengerService } from '../../../messenger/services/messenger.service';
import { Router } from '@angular/router';
import { UserDto } from '../../dataModel/userDto';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './userList.component.html',
  styleUrls: ['./userList.component.css'],
})
export class UserListComponent implements OnInit {
  public users$;
  private userSubject: BehaviorSubject<UserDto[]> = new BehaviorSubject([]);

  constructor(
    private userService: UserService,
    private messengerService: MessengerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.users$ = this.getUserList();
  }

  public getUserList(): BehaviorSubject<UserDto[]> {
    this.userService.getAllUsers().subscribe((users) => {
      this.userSubject.next(users);
    });
    return this.userSubject;
  }

  public editedUser(id: number): BehaviorSubject<UserDto> {
    this.router.navigate(['/edit', id]);
    return;
  }

  public removeUser(userDto: UserDto): BehaviorSubject<UserDto> {
    const id = userDto.id;
    this.userService.deleteUser(id).subscribe((user) => {
      this.getUserList();
      return user;
    });
    return this.users$;
  }
}
