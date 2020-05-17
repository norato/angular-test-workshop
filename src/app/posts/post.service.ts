import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { first, tap } from 'rxjs/operators';

import { environment } from './../../environments/environment';
import { Post } from './post.interface';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly baseUrl = environment.baseUrl;
  private readonly postsUrl = `${this.baseUrl}/posts`;

  private readonly entitiesPriv = new BehaviorSubject<Post[]>([]);
  entities$ = this.entitiesPriv.asObservable();

  constructor(private readonly httpClient: HttpClient) {}

  getPosts(): void {
    this.httpClient
      .get<Post[]>(this.postsUrl)
      .pipe(
        tap((entities) => this.entitiesPriv.next(entities)),
        first()
      )
      .subscribe();
  }
}
