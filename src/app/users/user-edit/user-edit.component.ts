import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { Subject } from 'rxjs';
import { pluck, switchMap, takeUntil, tap } from 'rxjs/operators';

import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit, OnDestroy {
  form = this.formBuilder.group({
    id: [''],
    avatar: [''],
    email: ['', Validators.required],
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
  });

  private readonly destroy$ = new Subject();
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly usersService: UsersService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar,
    private readonly spinner: SpinnerVisibilityService
  ) {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.spinner.show();
    this.activatedRoute.params
      .pipe(
        takeUntil(this.destroy$),
        pluck('id'),
        switchMap((id) => this.usersService.getUser(id)),
        pluck('data'),
        tap((user) => this.form.setValue(user)),
        tap(() => this.spinner.hide())
      )
      .subscribe();
  }

  back() {
    this.router.navigate(['/users']);
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    const user = this.form.value;
    this.spinner.show();
    this.usersService
      .updateUser(user)
      .pipe(
        takeUntil(this.destroy$),
        tap(() => this.spinner.hide()),
        tap(() => this.openSnackbar('User saved successfully')),
        tap(() => this.back())
      )
      .subscribe();
  }

  openSnackbar(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 3_000,
    });
  }
}
