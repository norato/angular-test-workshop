import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User, UsersResponse } from './users.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly baseUrl = environment.baseUrl;
  private readonly usersUrl = `${this.baseUrl}/users`;

  private readonly entitiesPriv = new BehaviorSubject<UsersResponse>(
    {} as UsersResponse
  );
  entities$ = this.entitiesPriv.asObservable();

  constructor(private readonly httpClient: HttpClient) {}

  private userUrl(id?: string) {
    return `${this.usersUrl}/${id}`;
  }

  getUsers(): void {
    this.httpClient
      .get<UsersResponse>(this.usersUrl)
      .pipe(
        tap((entities) => this.entitiesPriv.next(entities)),
        first()
      )
      .subscribe();
  }

  deleteUser(id: string): Observable<any> {
    const url = this.userUrl(id);
    return this.httpClient.delete<User>(url);
  }
}
