import { Component, OnInit } from '@angular/core';

import { PostService } from '../post.service';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.scss'],
})
export class ListPostsComponent implements OnInit {
  dataSource$ = this.postService.entities$;
  columns = ['id', 'title'];

  constructor(private readonly postService: PostService) {}

  ngOnInit(): void {
    this.postService.getPosts();
  }
  tableActions(action) {
    console.log('ListPostsComponent -> tableActions -> action', action);
  }
}
