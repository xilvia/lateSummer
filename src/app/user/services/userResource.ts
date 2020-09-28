import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiConfig } from '../../common/apiConfig';
import { UserDto } from '../dataModel/userDto';
import { EditUserDto } from '../dataModel/editUserDto';
import { CreateUserDto } from '../dataModel/createUserDto';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class UserResource {
  private readonly url = `${apiConfig.url}/api/v1/users`;

  constructor(private http: HttpClient) {}

  public findAll(): BehaviorSubject<UserDto[]> {
    return this.http.get<UserDto[]>(this.url) as BehaviorSubject<UserDto[]>;
  }

  public findOne(id: number): BehaviorSubject<UserDto> {
    return this.http.get<UserDto>(`${this.url}/${id}`) as BehaviorSubject<
      UserDto
    >;
  }

  // public findUserName(userName: string) {
  //   console.log(userName);
  //   return this.http.post(this.url, userName);
  // }

  public update(
    id: number,
    editUserDto: EditUserDto
  ): BehaviorSubject<UserDto> {
    console.log(this.url);
    return this.http.put<UserDto>(
      `${this.url}/${id}`,
      editUserDto
    ) as BehaviorSubject<UserDto>;
  }

  public delete(id: number): BehaviorSubject<UserDto> {
    return this.http.delete<UserDto>(`${this.url}/${id}`) as BehaviorSubject<
      UserDto
    >;
  }
}
