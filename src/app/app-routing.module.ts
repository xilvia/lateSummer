import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user/controllers/userList/userList.component';
import { MessengerComponent } from './messenger/controllers/messenger/messenger.component';
import { CreateUserComponent } from './user/controllers/create-user/create-user.component';
import { UpdateUserComponent } from './user/controllers/update-user/update-user.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'list', component: UserListComponent, canActivate: [AuthGuard] },
  { path: 'create', component: CreateUserComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: UpdateUserComponent },
  { path: 'messenger', component: MessengerComponent },
  { path: 'nav', component: NavComponent },
  { path: '', redirectTo: 'HomeComponent', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
