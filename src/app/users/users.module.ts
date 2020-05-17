import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgHttpLoaderModule } from 'ng-http-loader';

import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { ListUsersComponent } from './list-users/list-users.component';
import { UserViewComponent } from './user-view/user-view.component';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';

@NgModule({
  declarations: [UsersComponent, ListUsersComponent, UserViewComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    MaterialModule,
    NgHttpLoaderModule.forRoot(),
  ],
  entryComponents: [UserViewComponent],
})
export class UsersModule {}
