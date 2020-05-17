import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { delay, first, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User, UsersResponse } from './users.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly baseUrl = environment.baseUrl;
  private readonly usersUrl = `${this.baseUrl}/users`;

  private readonly entitiesPriv = new Subject<UsersResponse>();
  entities$ = this.entitiesPriv.asObservable();

  constructor(private readonly httpClient: HttpClient) {}

  private userUrl(id?: string | number) {
    return `${this.usersUrl}/${id}`;
  }

  getUsers(): void {
    this.httpClient
      .get<UsersResponse>(this.usersUrl)
      .pipe(
        tap((entities) => this.entitiesPriv.next(entities)),
        delay(2_000),
        first()
      )
      .subscribe();
  }

  getUser(id: string): Observable<any> {
    const url = this.userUrl(id);
    return this.httpClient.get<User>(url).pipe(delay(2_000));
  }

  updateUser(user: User): Observable<any> {
    const { id } = user;
    const url = this.userUrl(id);
    return this.httpClient.put<User>(url, user).pipe(delay(2_000));
  }

  deleteUser(id: string): Observable<any> {
    const url = this.userUrl(id);
    return this.httpClient.delete<User>(url).pipe(delay(2_000));
  }
}
