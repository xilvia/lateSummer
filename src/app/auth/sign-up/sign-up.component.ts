import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { BehaviorSubject } from 'rxjs';
import { MessengerService } from 'src/app/messenger/services/messenger.service';
import { CreateUserDto } from 'src/app/user/dataModel/createUserDto';
import { UserDto } from 'src/app/user/dataModel/userDto';
import { UserService } from 'src/app/user/services/user.service';
import { ValidatorService } from 'src/app/user/services/validator.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  public signUpForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private validatorService: ValidatorService,
    private messengerService: MessengerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          this.validatorService.firstNameValidator(),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          this.validatorService.lastNameValidator(),
        ],
      ],
      userName: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(12),
          RxwebValidators.alphaNumeric(),
          this.validatorService.userNameValidator(),
        ],
      ],
      email: ['', [Validators.required, RxwebValidators.email()]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(12),
          this.validatorService.passwordValidator(),
        ],
      ],
      confirmPassword: [
        '',
        [
          Validators.required,
          RxwebValidators.compare({ fieldName: 'password' }),
        ],
      ],
    });
  }

  get firstName() {
    return this.signUpForm.get('firstName');
  }

  get lastName() {
    return this.signUpForm.get('lastName');
  }

  get userName() {
    return this.signUpForm.get('userName');
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

  onSubmit(): void {
    if (this.signUpForm.valid) {
      const user = new BehaviorSubject(this.signUpForm.value);
      this.addUser(user.value);
    }
  }

  public addUser(createUserDto: CreateUserDto): BehaviorSubject<UserDto> {
    console.log('addNewUser', createUserDto);
    this.authService.signup(createUserDto).subscribe((user) => {
      return console.log(user);
    });
    this.router.navigate(['/userList']);
    return;
  }
}
