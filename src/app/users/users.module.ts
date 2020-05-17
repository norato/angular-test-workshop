import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgHttpLoaderModule } from 'ng-http-loader';

import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { ListUsersComponent } from './list-users/list-users.component';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';

@NgModule({
  declarations: [UsersComponent, ListUsersComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    MaterialModule,
    NgHttpLoaderModule.forRoot(),
  ],
})
export class UsersModule {}
