import { invalid } from '@angular/compiler/src/render3/view/util';
import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidatorService {
  constructor() {}

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

  addressValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp(/^\d+\s[A-z]+\s[A-z]+/);
      const valid = regex.test(control.value);
      return valid ? null : { invalidAddress: true };
    };
  }
}
