import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MockService } from 'ng-mocks';

export const MatDialogMock = {
  provide: MatDialog,
  useValue: MockService(MatDialog),
};

export const MatSnackBarMock = {
  provide: MatSnackBar,
  useValue: MockService(MatSnackBar),
};
