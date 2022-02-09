import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgHttpLoaderModule } from 'ng-http-loader';

import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { UsersComponent } from './index/users.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserViewComponent } from './user-view/user-view.component';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
    declarations: [
        UsersComponent,
        ListUsersComponent,
        UserViewComponent,
        UserEditComponent,
    ],
    imports: [
        CommonModule,
        UsersRoutingModule,
        SharedModule,
        MaterialModule,
        NgHttpLoaderModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
    ]
})
export class UsersModule {}
