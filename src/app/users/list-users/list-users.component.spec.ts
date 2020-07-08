import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { MockService } from 'ng-mocks';
import { of, Subject, throwError } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { User } from '../users.interface';
import { UsersServiceMock, UsersServiceMockEntitiesSubject } from '../users.service-mock';
import { MatDialogMock, MatSnackBarMock } from './../../material/material.mocks';
import { UsersService } from './../users.service';
import { ListUsersComponent } from './list-users.component';

describe('ListUsersComponent', () => {
  let component: ListUsersComponent;
  let fixture: ComponentFixture<ListUsersComponent>;
  let usersService: UsersService;
  let dialog: MatDialog;
  let spinner: SpinnerVisibilityService;
  let router: Router;

  const id = '1';
  const action = { row: { id } };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'users/:id', children: [] }]),
      ],
      declarations: [ListUsersComponent],
      providers: [
        {
          provide: UsersService,
          useValue: UsersServiceMock,
        },
        MatDialogMock,
        MatSnackBarMock,
        {
          provide: SpinnerVisibilityService,
          useValue: MockService(SpinnerVisibilityService),
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUsersComponent);
    spinner = TestBed.inject(SpinnerVisibilityService);
    usersService = TestBed.inject(UsersService);
    router = TestBed.inject(Router);
    dialog = TestBed.inject(MatDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  describe('OnInit', () => {
    it('should call .getUsers', () => {
      const spied = jest.spyOn(component, 'getUsers');
      component.ngOnInit();
      expect(spied).toHaveBeenCalled();
    });

    describe('should .getUsers call', () => {
      it('should spinner.show', () => {
        jest.spyOn(spinner, 'show');
        component.getUsers();
        expect(spinner.show).toHaveBeenCalled();
      });
      it('should usersService.getUsers', () => {
        component.getUsers();
        expect(usersService.getUsers).toHaveBeenCalled();
      });
    });
  });

  it('.editCallback', () => {
    fixture.ngZone.run(() => {
      jest.spyOn(router, 'navigate');

      component.editCallback(action);
      expect(router.navigate).toHaveBeenCalledWith(['users/', id]);
    });
  });

  describe('.deleteCallback dialog.open should have the .afterClosed()', () => {
    beforeEach(() => {
      jest.spyOn(spinner, 'show');
      const mockDialogResponse: any = {
        afterClosed: jest.fn(() => of(true)),
      };
      jest.spyOn(dialog, 'open').mockReturnValue(mockDialogResponse);
      jest.spyOn(component, 'openSnackbar');
      jest.spyOn(component, 'getUsers');
    });

    it('should call spinner.show', () => {
      component.deleteCallback(action);

      fixture.whenStable();
      expect(spinner.show).toHaveBeenCalled();
    });
    it('should usersService.deleteUser', () => {
      component.deleteCallback(action);

      fixture.whenStable();
      expect(usersService.deleteUser).toHaveBeenCalledWith(id);
    });

    describe('on deleteUser success', () => {
      it('should openSnackbar', () => {
        component.deleteCallback(action);

        fixture.whenStable();
        expect(component.openSnackbar).toHaveBeenCalled();
      });

      it('should getUsers', () => {
        component.deleteCallback(action);

        fixture.whenStable();
        expect(component.getUsers).toHaveBeenCalled();
      });
    });

    describe('on deleteUser fail', () => {
      beforeEach(() => {
        jest
          .spyOn(usersService, 'deleteUser')
          .mockReturnValue(throwError('faio'));
      });

      it('should not calll openSnackbar', () => {
        component.deleteCallback(action);

        fixture.whenStable();
        expect(component.openSnackbar).not.toHaveBeenCalled();
      });

      it('should not calll getUsers', () => {
        component.deleteCallback(action);

        fixture.whenStable();
        expect(component.getUsers).not.toHaveBeenCalled();
      });
    });
  });

  describe('dataSource$', () => {
    const expected: User[] = [
      {
        id: 11324,
        email: 'string',
      },
    ];
    const httpResponse = {
      data: expected,
    };

    let destroy$;

    beforeEach(() => {
      destroy$ = new Subject();
    });
    afterEach(() => {
      destroy$.next();
      destroy$.complete();
    });

    it('should map the correct response', () => {
      UsersServiceMockEntitiesSubject.next(httpResponse);
      component.dataSource$
        .pipe(
          takeUntil(destroy$),
          tap((response) => {
            expect(response).toEqual(expected);
          })
        )
        .subscribe();
    });

    it('should call spinner', () => {
      jest.spyOn(spinner, 'hide');
      UsersServiceMockEntitiesSubject.next(httpResponse);
      component.dataSource$
        .pipe(
          takeUntil(destroy$),
          tap((response) => {
            expect(spinner.hide).toHaveBeenCalled();
          })
        )
        .subscribe();
    });
  });
});
