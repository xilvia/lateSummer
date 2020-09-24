import { Directive, forwardRef, Injectable } from '@angular/core';
import {
  AsyncValidator,
  AbstractControl,
  NG_ASYNC_VALIDATORS,
  ValidationErrors,
} from '@angular/forms';
import { catchError, map } from 'rxjs/operators';
import { ValidatorService } from './validator.service';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UniqueUserNameValidator implements AsyncValidator {
  constructor(private validatorService: ValidatorService) {}

  validate(
    ctrl: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    console.log('validál');
    return this.validatorService.isUserNameTaken(ctrl.value).pipe(
      map((isTaken) => (isTaken ? { uniqueUserName: true } : null)),
      catchError(() => of(null))
    );
  }
}

@Directive({
  selector: '[appUniqueUserName]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => UniqueUserNameValidator),
      multi: true,
    },
  ],
})
export class UniqueUserNameDirective {
  constructor(private validator: UniqueUserNameValidator) {}

  validate(control: AbstractControl) {
    this.validator.validate(control);
  }
}
