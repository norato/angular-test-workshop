import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, switchMap, tap } from 'rxjs/operators';

import { ConfirmationDialogComponent } from '../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
})
export class ListUsersComponent implements OnInit {
  dataSource$ = this.usersService.entities$;
  columns = ['id', 'title'];

  constructor(
    private readonly usersService: UsersService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.usersService.getUsers();
  }

  tableActions(action) {
    console.log('ListUsersComponent -> tableActions -> action', action);
    switch (action?.name) {
      case 'delete':
        this.deleteCallback(action);
        break;

      default:
        break;
    }
  }

  deleteCallback(action) {
    const userID = action?.row?.id;
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: {
        message: `Do you want to delete the user id: ${userID}`,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter((result) => !!result),
        switchMap(() => this.usersService.deleteUser(userID)),
        tap((it) => console.log('Tap -> :', it))
        // tap(() => this.usersService.getUsers())
      )
      .subscribe();
  }
}
