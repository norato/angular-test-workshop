import { Observable, of, Subject } from 'rxjs';

import { User } from './users.interface';

export const UsersServiceMockEntitiesSubject = new Subject();

export const UsersServiceMock = {
  entities$: UsersServiceMockEntitiesSubject.asObservable(),
  getUsers: jest.fn((): void => {}),
  getUser: jest.fn((id: string): Observable<any> => of({})),
  updateUser: jest.fn((user: User): Observable<any> => of({})),
  deleteUser: jest.fn((id: string): Observable<any> => of({})),
};
