import { Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { AuthUser } from '../users/entities/auth-user.entity';
import { Post } from './entity/post.entity';
import { PostNotFoundException } from './exception/post-not-found.exception';

@Injectable()
export class PostsService {
  private readonly logger = new Logger(PostsService.name);

  private posts: Post[] = [];

  constructor() {}

  findMyPosts(user: AuthUser): Post[] {
    return this.posts.filter((post) => post.createdBy === user.sub);
  }

  findById(user: AuthUser, id: string): Post {
    const post = this.posts.find(
      (post) => post.id === id && post.createdBy === user.sub,
    );
    if (!post) throw PostNotFoundException.byId(id);

    return post;
  }

  create(user: AuthUser, text: string): Post {
    const post: Post = {
      id: randomUUID(),
      createdBy: user.sub,
      text: text,
    };
    this.posts.push(post);

    return post;
  }

  updateById(user: AuthUser, id: string, text: string): Post {
    const post = this.findById(user, id);
    post.text = text;

    return post;
  }

  deleteById(user: AuthUser, id: string): void {
    this.posts = this.posts.filter(
      (post) => post.id === id && post.createdBy === user.sub,
    );
  }
}

