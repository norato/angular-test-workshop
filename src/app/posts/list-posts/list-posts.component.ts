import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, switchMap, tap } from 'rxjs/operators';

import { PostService } from '../post.service';
import { ConfirmationDialogComponent } from './../../shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.scss'],
})
export class ListPostsComponent implements OnInit {
  dataSource$ = this.postService.entities$;
  columns = ['id', 'title'];

  constructor(
    private readonly postService: PostService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.postService.getPosts();
  }

  tableActions(action) {
    switch (action?.name) {
      case 'delete':
        this.deleteCallback(action);
        break;

      default:
        break;
    }
    console.log('ListPostsComponent -> tableActions -> action', action);
  }

  deleteCallback(action) {
    const postID = action?.row?.id;
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: {
        message: `Do you want to delete the post id: ${postID}`,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter((result) => !!result),
        switchMap(() => this.postService.deletePost(postID)),
        tap((it) => console.log('Tap -> :', it))
        // tap(() => this.postService.getPosts())
      )
      .subscribe();
  }
}
