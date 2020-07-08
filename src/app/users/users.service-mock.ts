import { Observable, of } from 'rxjs';

import { User } from './users.interface';

export const UsersServiceMock = {
  entities$: of([]),
  getUsers: jest.fn((): void => {}),
  getUser: jest.fn((id: string): Observable<any> => of({})),
  updateUser: jest.fn((user: User): Observable<any> => of({})),
  deleteUser: jest.fn((id: string): Observable<any> => of({})),
};
