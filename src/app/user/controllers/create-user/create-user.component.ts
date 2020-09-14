import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MessengerService } from '../../../messenger/services/messenger.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserDto } from '../../dataModel/userDto';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateUserDto } from '../../dataModel/createUserDto';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { ValidatorService } from '../../services/validator.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {
  public userProfile: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private validatorService: ValidatorService,
    private messengerService: MessengerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userProfile = this.formBuilder.group({
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
      address: [
        '',
        [Validators.required, this.validatorService.addressValidator()],
      ],
    });
  }

  get firstName() {
    return this.userProfile.get('firstName');
  }

  get lastName() {
    return this.userProfile.get('lastName');
  }

  get userName() {
    return this.userProfile.get('userName');
  }

  get email() {
    return this.userProfile.get('email');
  }

  get password() {
    return this.userProfile.get('password');
  }

  get confirmPassword() {
    return this.userProfile.get('confirmPassword');
  }

  get address() {
    return this.userProfile.get('address');
  }

  onSubmit(): void {
    if (this.userProfile.valid) {
      const user = new BehaviorSubject(this.userProfile.value);
      this.addUser(user.value);
    }
  }

  public addUser(createUserDto: CreateUserDto): BehaviorSubject<UserDto> {
    console.log('addNewUser', createUserDto);
    this.userService.createUser(createUserDto).subscribe((user) => {
      return console.log(user);
    });
    this.router.navigate(['/list']);
    return;
  }
}
