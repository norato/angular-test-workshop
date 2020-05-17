import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ListPostsComponent } from './list-posts/list-posts.component';
import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './posts.component';

@NgModule({
  declarations: [PostsComponent, ListPostsComponent],
  imports: [CommonModule, PostsRoutingModule, SharedModule],
})
export class PostsModule {}
