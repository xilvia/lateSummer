import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user/controllers/userList/userList.component';
import { MessengerComponent } from './messenger/controllers/messenger/messenger.component';
import { UpdateUserComponent } from './user/controllers/update-user/update-user.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { DisplayResponseComponent } from './api/display-response/display-response.component';
import { ProjectListComponent } from './projects/controllers/project-list/project-list.component';
import { CreateProjectComponent } from './projects/controllers/create-project/create-project.component';
import { UpdateProjectComponent } from './projects/controllers/update-project/update-project.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'userList', component: UserListComponent, canActivate: [AuthGuard] },
  {
    path: 'editUser/:id',
    component: UpdateUserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'projectList',
    component: ProjectListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'createProject',
    component: CreateProjectComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'editProject/:id',
    component: UpdateProjectComponent,
    canActivate: [AuthGuard],
  },
  { path: 'messenger', component: MessengerComponent },
  { path: 'nav', component: NavComponent },
  {
    path: 'api',
    component: DisplayResponseComponent,
    canActivate: [AuthGuard],
  },
  { path: '', redirectTo: 'HomeComponent', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
