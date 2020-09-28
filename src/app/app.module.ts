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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserResource } from './user/services/userResource';
//import { CreateUserComponent } from './user/controllers/create-user/create-user.component';
import { UpdateUserComponent } from './user/controllers/update-user/update-user.component';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { ValidatorService } from './user/services/validator.service';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { NavComponent } from './nav/nav.component';
import { UniqueUserNameDirective } from './user/services/unique-user-name.directive';
import { AuthInterceptor } from './auth/auth-interceptor';
import { HomeComponent } from './home/home.component';
import { DisplayResponseComponent } from './api/display-response/display-response.component';
import { ApiInterceptor } from './api/api-interceptor';
import { CreateProjectComponent } from './projects/controllers/create-project/create-project.component';
import { UpdateProjectComponent } from './projects/controllers/update-project/update-project.component';
import { ProjectListComponent } from './projects/controllers/project-list/project-list.component';
import { ProjectService } from './projects/services/project.service';
import { ApiService } from './api/api.service';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    MessengerComponent,
   // CreateUserComponent,
    UpdateUserComponent,
    NavComponent,
    LoginComponent,
    SignUpComponent,
    UniqueUserNameDirective,
    HomeComponent,
    DisplayResponseComponent,
    CreateProjectComponent,
    UpdateProjectComponent,
    ProjectListComponent,
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
  providers: [
    UserService,
    ProjectService,
    ApiService,
    MessengerService,
    UserResource,
    ValidatorService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
