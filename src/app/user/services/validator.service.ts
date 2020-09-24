import { invalid } from '@angular/compiler/src/render3/view/util';
import { Injectable } from '@angular/core';
import {
  ValidatorFn,
  AbstractControl,
  ControlContainer,
  AsyncValidator,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { UserResource } from './userResource';
import { CreateUserDto } from '../dataModel/createUserDto';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable, of, Subject } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { UserDto } from '../dataModel/userDto';
import { __values } from 'tslib';
import { isNgTemplate } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class ValidatorService {
  constructor(private userResource: UserResource) {}
  private userSubject: BehaviorSubject<UserDto[]> = new BehaviorSubject([]);

  isUserNameTaken(userName: string): Observable<boolean> {
    console.log(userName);
    const userlist = [];
    const list = [];
    this.userResource
      .findAll()
      .subscribe((users) => this.userSubject.next(users));

    const isTaken = userlist.includes(userName);

    return of(isTaken).pipe(delay(400));
  }

  firstNameValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp(/[a-záéíóúöőüűA-ZÁÉÍÓÚÖŐÜŰ]+$/);
      const valid = regex.test(control.value);
      return valid ? null : { invalidFirstName: true };
    };
  }

  lastNameValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp(/[a-záéíóúöőüűA-ZÁÉÍÓÚÖŐÜŰ]+$/);
      const valid = regex.test(control.value);
      return valid ? null : { invalidLastName: true };
    };
  }

  userNameValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp(/^(?=.*\d*)(?=.*[a-zA-Z]).{4,12}$/);
      const valid = regex.test(control.value);
      return valid ? null : { invalidUserName: true };
    };
  }

  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^ˇ&*-.,<>]).{8,}/
      );
      const valid = regex.test(control.value);
      console.log(control.value);
      console.log(valid);
      return valid ? null : { invalidPassword: true };
    };
  }
}
