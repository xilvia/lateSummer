import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user/controllers/userList/userList.component';
import { MessengerComponent } from './messenger/controllers/messenger/messenger.component';
import { CreateUserComponent } from './user/controllers/create-user/create-user.component';
import { UpdateUserComponent } from './user/controllers/update-user/update-user.component';

const routes: Routes = [
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
