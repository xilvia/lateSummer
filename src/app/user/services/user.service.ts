import { Injectable } from '@angular/core';
import { UserDto } from '../dataModel/userDto';
import { EditUserDto } from '../dataModel/editUserDto';
import { CreateUserDto } from '../dataModel/createUserDto';
import { UserResource } from './userResource';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private userResource: UserResource) {}

  public getAllUsers(): BehaviorSubject<UserDto[]> {
    return this.userResource.findAll() as BehaviorSubject<UserDto[]>;
  }

  public getUserById(id: number): BehaviorSubject<UserDto> {
    return this.userResource.findOne(id);
  }

  public createUser(createUserDto: CreateUserDto): BehaviorSubject<UserDto> {
    return this.userResource.post(createUserDto);
  }

  public updateUser(
    id: number,
    editUserDto: EditUserDto
  ): BehaviorSubject<UserDto> {
    return this.userResource.update(id, editUserDto);
  }

  public deleteUser(id: number): BehaviorSubject<UserDto> {
    return this.userResource.delete(id);
  }
}
