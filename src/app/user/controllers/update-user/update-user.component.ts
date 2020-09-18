import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { BehaviorSubject } from 'rxjs';
import { MessengerService } from 'src/app/messenger/services/messenger.service';
import { EditUserDto } from '../../dataModel/editUserDto';
import { UserDto } from '../../dataModel/userDto';
import { UserService } from '../../services/user.service';
import { ValidatorService } from '../../services/validator.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent implements OnInit {
  public userProfile: FormGroup;
  private userId: number;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private validatorService: ValidatorService,
    private messengerService: MessengerService,
    private router: Router,
    private activatedRoute: ActivatedRoute
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
      address: [
        '',
        [Validators.required, this.validatorService.addressValidator()],
      ],
    });

    this.activatedRoute.paramMap.subscribe((params) => {
      this.userId = +params.get('id');
      this.getOneUser(this.userId);
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

  get address() {
    return this.userProfile.get('address');
  }

  onSubmit(): void {
    if (this.userProfile.valid) {
      this.editUser(this.userId, this.userProfile.value);
    }
  }

  public editUser(
    id: number,
    editUserDto: EditUserDto
  ): BehaviorSubject<UserDto> {
    this.userId = id;
    this.userService.updateUser(id, editUserDto).subscribe((editedUser) => {
      return editedUser;
    });
    this.router.navigate(['/list']);
    return;
  }

  public getOneUser(id: number): BehaviorSubject<UserDto> {
    this.userService.getUserById(id).subscribe((user) => {
      this.patchUserData(user);
      return user;
    });
    return;
  }

  public patchUserData(editUserDto: EditUserDto): BehaviorSubject<UserDto> {
    this.userProfile.patchValue({
      id: editUserDto.id,
      firstName: editUserDto.firstName,
      lastName: editUserDto.lastName,
      userName: editUserDto.userName,
      email: editUserDto.email,
      address: editUserDto.address,
    });
    return this.userProfile.value;
  }
}
