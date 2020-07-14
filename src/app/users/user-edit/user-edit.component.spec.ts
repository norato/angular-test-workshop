import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditComponent } from './user-edit.component';
import { Router, ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UsersService } from '../users.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { UsersServiceMock } from '../users.service-mock';
import { MatSnackBarMock } from 'src/app/material/material.mocks';
import { MockService } from 'ng-mocks';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

const id = '1';
const activatedRouteMock = {params: of({ id })};

describe('UserEditComponent', () => {
  let component: UserEditComponent;
  let fixture: ComponentFixture<UserEditComponent>;
  let activatedRoute: ActivatedRoute;
  let formBuilder: FormBuilder;
  let spinner: SpinnerVisibilityService;
  let usersService: UsersService;
  let router: Router;
  let snackBar: MatSnackBar;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        RouterTestingModule.withRoutes([{path: 'user', children: [] }]),
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [UserEditComponent],
      providers:[{
        provide: UsersService,
        useValue: UsersServiceMock,
      },
      MatSnackBarMock,
      {
        provide: SpinnerVisibilityService,
        useValue: MockService(SpinnerVisibilityService),
      },
      {
        provide: ActivatedRoute,
        useValue: activatedRouteMock,
      }

    ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditComponent);
    component = fixture.componentInstance;
    spinner = TestBed.inject(SpinnerVisibilityService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('OnInit', () => {
    it('should call .spinner show ', () => {
      const spySpinner = jest.spyOn(spinner,'show');
      
      component.ngOnInit();

      expect(spySpinner).toHaveBeenCalled();
      
    });
  });
});
