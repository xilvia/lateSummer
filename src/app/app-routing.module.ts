import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user/controllers/userList/userList.component';
import { MessengerComponent } from './messenger/controllers/messenger/messenger.component';
import { CreateUserComponent } from './user/controllers/create-user/create-user.component';
import { UpdateUserComponent } from './user/controllers/update-user/update-user.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'list', component: UserListComponent },
  { path: 'create', component: CreateUserComponent },
  { path: 'edit/:id', component: UpdateUserComponent },
  { path: 'messenger', component: MessengerComponent },
  { path: '', redirectTo: '/list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
