import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserListComponent } from './user/controllers/userList/userList.component';
import { MessengerComponent } from './messenger/controllers/messenger/messenger.component';
import { UserService } from './user/services/user.service';
import { MessengerService } from './messenger/services/messenger.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserResource } from './user/services/userResource';
import { CreateUserComponent } from './user/controllers/create-user/create-user.component';
import { UpdateUserComponent } from './user/controllers/update-user/update-user.component';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { ValidatorService } from './user/services/validator.service';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { NavComponent } from './nav/nav.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    MessengerComponent,
    CreateUserComponent,
    UpdateUserComponent,
    NavComponent,
    LoginComponent,
    SignUpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatFormFieldModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RxReactiveFormsModule,
  ],
  providers: [UserService, MessengerService, UserResource, ValidatorService],
  bootstrap: [AppComponent],
})
export class AppModule {}
